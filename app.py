from flask import Flask, request, jsonify # type: ignore
from flask_cors import CORS # type: ignore
from werkzeug.utils import secure_filename
import os
from ai_model import predict_disease, CropDiseaseModel
import logging
import firebase_admin # type: ignore
from firebase_admin import credentials, auth # type: ignore
from functools import wraps
import concurrent.futures
from PIL import Image
import io
import base64
import numpy as np

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Firebase Admin
cred = credentials.Certificate('firebase-credentials.json')
firebase_admin.initialize_app(cred)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure upload folder
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def require_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return jsonify({'error': 'No authorization header', 'status': 'error'}), 401
        
        try:
            # Extract token from Bearer header
            token = auth_header.split('Bearer ')[1]
            # Verify the token
            decoded_token = auth.verify_id_token(token)
            request.user = decoded_token
            return f(*args, **kwargs)
        except Exception as e:
            logger.error(f"Authentication error: {str(e)}")
            return jsonify({'error': 'Invalid token', 'status': 'error'}), 401
    return decorated

def preprocess_image(image_data, options=None):
    """Preprocess image based on provided options"""
    if options is None:
        options = {}
    
    try:
        # Convert base64 to image if needed
        if isinstance(image_data, str):
            if image_data.startswith('data:image'):
                image_data = image_data.split(',')[1]
            image_data = base64.b64decode(image_data)
        
        # Open image
        image = Image.open(io.BytesIO(image_data))
        
        # Apply preprocessing options
        if options.get('resize'):
            width, height = options['resize']
            image = image.resize((width, height), Image.Resampling.LANCZOS)
        
        if options.get('normalize'):
            # Convert to RGB if needed
            if image.mode != 'RGB':
                image = image.convert('RGB')
            
            # Normalize pixel values
            img_array = np.array(image) / 255.0
            image = Image.fromarray((img_array * 255).astype(np.uint8))
        
        if options.get('enhance'):
            from PIL import ImageEnhance
            enhancer = ImageEnhance.Contrast(image)
            image = enhancer.enhance(1.2)
        
        # Convert back to bytes
        img_byte_arr = io.BytesIO()
        image.save(img_byte_arr, format='JPEG')
        img_byte_arr = img_byte_arr.getvalue()
        
        return img_byte_arr
    except Exception as e:
        logger.error(f"Error preprocessing image: {str(e)}")
        raise ValueError(f"Image preprocessing failed: {str(e)}")

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'AI Model API is running'
    })

@app.route('/api/predict', methods=['POST'])
@require_auth
def predict():
    """Endpoint for disease prediction"""
    try:
        # Check if file was uploaded
        if 'file' not in request.files and 'image' not in request.json:
            return jsonify({
                'error': 'No image data provided',
                'status': 'error'
            }), 400

        # Get preprocessing options
        options = request.json.get('options', {}) if 'image' in request.json else {}
        
        # Handle file upload
        if 'file' in request.files:
            file = request.files['file']
            if file.filename == '':
                return jsonify({
                    'error': 'No file selected',
                    'status': 'error'
                }), 400
            if not allowed_file(file.filename):
                return jsonify({
                    'error': 'File type not allowed. Please upload a PNG, JPG, or JPEG image.',
                    'status': 'error'
                }), 400
            image_data = file.read()
        else:
            # Handle base64 image
            image_data = request.json['image']
        
        # Preprocess image
        processed_image = preprocess_image(image_data, options)
        
        # Save temporarily for prediction
        temp_path = os.path.join(app.config['UPLOAD_FOLDER'], 'temp.jpg')
        with open(temp_path, 'wb') as f:
            f.write(processed_image)
        
        # Get prediction
        result = predict_disease(temp_path)
        
        # Clean up
        os.remove(temp_path)
        
        return jsonify({
            'status': 'success',
            'data': result
        })

    except Exception as e:
        logger.error(f"Error processing request: {str(e)}")
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500

@app.route('/api/predict/batch', methods=['POST'])
@require_auth
def predict_batch():
    """Endpoint for batch disease prediction"""
    try:
        if 'files' not in request.files:
            return jsonify({
                'error': 'No files uploaded',
                'status': 'error'
            }), 400

        files = request.files.getlist('files')
        if not files:
            return jsonify({
                'error': 'No files selected',
                'status': 'error'
            }), 400

        # Process files in parallel
        results = []
        with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
            future_to_file = {
                executor.submit(process_single_file, file): file.filename
                for file in files
            }
            
            for future in concurrent.futures.as_completed(future_to_file):
                filename = future_to_file[future]
                try:
                    result = future.result()
                    results.append({
                        'filename': filename,
                        'result': result
                    })
                except Exception as e:
                    results.append({
                        'filename': filename,
                        'error': str(e)
                    })

        return jsonify({
            'status': 'success',
            'data': results
        })

    except Exception as e:
        logger.error(f"Error processing batch request: {str(e)}")
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500

def process_single_file(file):
    """Process a single file for prediction"""
    if not allowed_file(file.filename):
        raise ValueError('File type not allowed')
    
    # Save file temporarily
    temp_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(file.filename))
    file.save(temp_path)
    
    try:
        # Get prediction
        result = predict_disease(temp_path)
        return result
    finally:
        # Clean up
        if os.path.exists(temp_path):
            os.remove(temp_path)

@app.route('/api/diseases', methods=['GET'])
@require_auth
def get_diseases():
    """Endpoint to get list of supported diseases and their details"""
    try:
        model = CropDiseaseModel()
        return jsonify({
            'status': 'success',
            'data': {
                'diseases': list(model.recommendations.keys()),
                'recommendations': model.recommendations
            }
        })
    except Exception as e:
        logger.error(f"Error getting diseases list: {str(e)}")
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True) 