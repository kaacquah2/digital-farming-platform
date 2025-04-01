import sys
import json
from PIL import Image  # type: ignore

# Dummy disease information for testing
DISEASE_INFO = {
    "healthy": {
        "name": "Healthy Plant",
        "description": "The plant appears to be healthy with no visible signs of disease.",
        "recommendations": [
            "Continue regular watering schedule",
            "Maintain proper soil pH",
            "Monitor for any changes in plant health"
        ],
        "severity": "None",
        "confidence": 0.95
    },
    "leaf_blight": {
        "name": "Leaf Blight",
        "description": "Brown spots with yellow halos on leaves, indicating fungal infection.",
        "recommendations": [
            "Remove infected leaves",
            "Apply fungicide treatment",
            "Improve air circulation around plants",
            "Avoid overhead watering"
        ],
        "severity": "Moderate",
        "confidence": 0.85
    },
    "powdery_mildew": {
        "name": "Powdery Mildew",
        "description": "White powdery coating on leaves and stems.",
        "recommendations": [
            "Apply sulfur-based fungicide",
            "Increase spacing between plants",
            "Ensure proper ventilation",
            "Remove severely infected parts"
        ],
        "severity": "Low",
        "confidence": 0.90
    },
    "root_rot": {
        "name": "Root Rot",
        "description": "Dark, mushy roots with yellowing leaves.",
        "recommendations": [
            "Improve soil drainage",
            "Reduce watering frequency",
            "Apply fungicide to soil",
            "Consider repotting with fresh soil"
        ],
        "severity": "High",
        "confidence": 0.88
    }
}

def preprocess_image(image_path):
    """Dummy preprocessing function"""
    try:
        # Just verify the image can be opened
        img = Image.open(image_path)
        return True
    except Exception as e:
        print(f"Error processing image: {e}")
        return False

def predict_disease(image_path):
    """Dummy prediction function that returns random results"""
    import random
    
    # Simulate image processing
    if not preprocess_image(image_path):
        return None
    
    # Randomly select a disease (including healthy)
    diseases = list(DISEASE_INFO.keys())
    selected_disease = random.choice(diseases)
    
    return DISEASE_INFO[selected_disease]

def main():
    if len(sys.argv) != 2:
        print("Usage: python detect_disease.py <image_path>")
        sys.exit(1)
    
    image_path = sys.argv[1]
    result = predict_disease(image_path)
    
    if result:
        print(json.dumps(result))
    else:
        print(json.dumps({
            "error": "Failed to process image"
        }))

if __name__ == "__main__":
    main() 