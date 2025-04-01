import torch
import torch.nn as nn
import torchvision.transforms as transforms
from PIL import Image
import os
import json
from typing import Dict, Any, Optional, List
from torchvision import models

class CropDiseaseModel:
    def __init__(self, model_path: str = 'best_model.pth', class_mapping_path: str = 'class_mapping.json'):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        
        # Load class mapping
        try:
            with open(class_mapping_path, 'r') as f:
                self.class_mapping = json.load(f)
        except FileNotFoundError:
            raise FileNotFoundError(f"Class mapping file not found at {class_mapping_path}")
        
        # Initialize model
        try:
            self.model = torch.load(model_path, map_location=self.device)
            self.model.eval()
        except FileNotFoundError:
            raise FileNotFoundError(f"Model file not found at {model_path}")
        
        # Define image transforms
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406],
                              std=[0.229, 0.224, 0.225])
        ])
        
        # Define detailed recommendations for each disease
        self.recommendations = {
            'healthy': {
                'immediate_actions': [
                    'Continue regular monitoring',
                    'Maintain current care routine'
                ],
                'preventive_measures': [
                    'Regular watering schedule',
                    'Proper fertilization',
                    'Adequate spacing between plants'
                ],
                'monitoring_frequency': 'Weekly',
                'risk_level': 'Low'
            },
            'early_blight': {
                'immediate_actions': [
                    'Remove infected leaves immediately',
                    'Improve air circulation',
                    'Apply fungicide containing chlorothalonil or mancozeb'
                ],
                'preventive_measures': [
                    'Plant resistant varieties',
                    'Maintain proper spacing',
                    'Avoid overhead watering',
                    'Mulch around plants'
                ],
                'monitoring_frequency': 'Daily',
                'risk_level': 'Medium'
            },
            'late_blight': {
                'immediate_actions': [
                    'Remove and destroy infected plants',
                    'Improve drainage',
                    'Apply copper-based fungicide',
                    'Isolate affected area'
                ],
                'preventive_measures': [
                    'Use disease-free seeds',
                    'Implement crop rotation',
                    'Maintain proper spacing',
                    'Monitor weather conditions'
                ],
                'monitoring_frequency': 'Daily',
                'risk_level': 'High'
            },
            'leaf_mold': {
                'immediate_actions': [
                    'Reduce humidity levels',
                    'Improve ventilation',
                    'Remove infected leaves',
                    'Apply appropriate fungicide'
                ],
                'preventive_measures': [
                    'Maintain proper spacing',
                    'Use resistant varieties',
                    'Monitor humidity levels',
                    'Regular pruning'
                ],
                'monitoring_frequency': 'Daily',
                'risk_level': 'Medium'
            },
            'septoria_leaf_spot': {
                'immediate_actions': [
                    'Remove infected leaves',
                    'Avoid overhead watering',
                    'Apply fungicide',
                    'Improve air circulation'
                ],
                'preventive_measures': [
                    'Use disease-free seeds',
                    'Implement crop rotation',
                    'Maintain proper spacing',
                    'Regular pruning'
                ],
                'monitoring_frequency': 'Weekly',
                'risk_level': 'Medium'
            },
            'spider_mites': {
                'immediate_actions': [
                    'Increase humidity',
                    'Apply insecticidal soap',
                    'Introduce natural predators',
                    'Remove heavily infested leaves'
                ],
                'preventive_measures': [
                    'Regular monitoring',
                    'Maintain proper humidity',
                    'Avoid over-fertilization',
                    'Keep plants well-watered'
                ],
                'monitoring_frequency': 'Daily',
                'risk_level': 'Medium'
            },
            'target_spot': {
                'immediate_actions': [
                    'Remove infected leaves',
                    'Improve air circulation',
                    'Apply fungicide',
                    'Reduce leaf wetness'
                ],
                'preventive_measures': [
                    'Use resistant varieties',
                    'Maintain proper spacing',
                    'Avoid overhead watering',
                    'Regular pruning'
                ],
                'monitoring_frequency': 'Weekly',
                'risk_level': 'Medium'
            },
            'yellow_leaf_curl_virus': {
                'immediate_actions': [
                    'Remove infected plants',
                    'Control whitefly population',
                    'Use virus-free seeds',
                    'Implement physical barriers'
                ],
                'preventive_measures': [
                    'Use resistant varieties',
                    'Monitor whitefly populations',
                    'Implement crop rotation',
                    'Use reflective mulches'
                ],
                'monitoring_frequency': 'Daily',
                'risk_level': 'High'
            },
            'mosaic_virus': {
                'immediate_actions': [
                    'Remove infected plants',
                    'Control aphid population',
                    'Use virus-free seeds',
                    'Implement physical barriers'
                ],
                'preventive_measures': [
                    'Use resistant varieties',
                    'Monitor aphid populations',
                    'Implement crop rotation',
                    'Use reflective mulches'
                ],
                'monitoring_frequency': 'Daily',
                'risk_level': 'High'
            },
            'powdery_mildew': {
                'immediate_actions': [
                    'Remove infected leaves',
                    'Improve air circulation',
                    'Apply sulfur-based fungicide',
                    'Reduce humidity'
                ],
                'preventive_measures': [
                    'Use resistant varieties',
                    'Maintain proper spacing',
                    'Regular pruning',
                    'Monitor humidity levels'
                ],
                'monitoring_frequency': 'Weekly',
                'risk_level': 'Medium'
            },
            'downy_mildew': {
                'immediate_actions': [
                    'Remove infected leaves',
                    'Improve air circulation',
                    'Apply appropriate fungicide',
                    'Reduce leaf wetness'
                ],
                'preventive_measures': [
                    'Use resistant varieties',
                    'Avoid overhead watering',
                    'Maintain proper spacing',
                    'Monitor weather conditions'
                ],
                'monitoring_frequency': 'Daily',
                'risk_level': 'High'
            },
            'bacterial_spot': {
                'immediate_actions': [
                    'Remove infected leaves',
                    'Apply copper-based bactericide',
                    'Improve air circulation',
                    'Reduce leaf wetness'
                ],
                'preventive_measures': [
                    'Use disease-free seeds',
                    'Avoid overhead watering',
                    'Maintain proper spacing',
                    'Regular pruning'
                ],
                'monitoring_frequency': 'Daily',
                'risk_level': 'Medium'
            },
            'bacterial_wilt': {
                'immediate_actions': [
                    'Remove infected plants',
                    'Improve drainage',
                    'Apply appropriate bactericide',
                    'Isolate affected area'
                ],
                'preventive_measures': [
                    'Use disease-free seeds',
                    'Implement crop rotation',
                    'Maintain proper drainage',
                    'Monitor soil health'
                ],
                'monitoring_frequency': 'Daily',
                'risk_level': 'High'
            },
            'fusarium_wilt': {
                'immediate_actions': [
                    'Remove infected plants',
                    'Improve soil drainage',
                    'Apply appropriate fungicide',
                    'Isolate affected area'
                ],
                'preventive_measures': [
                    'Use resistant varieties',
                    'Implement crop rotation',
                    'Maintain proper drainage',
                    'Monitor soil health'
                ],
                'monitoring_frequency': 'Daily',
                'risk_level': 'High'
            },
            'root_rot': {
                'immediate_actions': [
                    'Remove infected plants',
                    'Improve drainage',
                    'Apply appropriate fungicide',
                    'Isolate affected area'
                ],
                'preventive_measures': [
                    'Use disease-free soil',
                    'Implement crop rotation',
                    'Maintain proper drainage',
                    'Monitor soil health'
                ],
                'monitoring_frequency': 'Daily',
                'risk_level': 'High'
            }
        }
        
    def preprocess_image(self, image_path: str) -> torch.Tensor:
        """Preprocess the input image."""
        try:
            image = Image.open(image_path).convert('RGB')
            return self.transform(image).unsqueeze(0).to(self.device)
        except Exception as e:
            raise ValueError(f"Error preprocessing image: {str(e)}")

    def get_recommendations(self, disease: str) -> Dict[str, Any]:
        """Get detailed recommendations for a specific disease."""
        return self.recommendations.get(disease.lower(), {
            'immediate_actions': [
                'Monitor plant health',
                'Consult with agricultural expert',
                'Follow standard crop care practices'
            ],
            'preventive_measures': [
                'Regular monitoring',
                'Proper plant care',
                'Maintain optimal growing conditions'
            ],
            'monitoring_frequency': 'Weekly',
            'risk_level': 'Unknown'
        })

    def predict(self, image_path: str) -> Dict[str, Any]:
        """
        Make a prediction for the given image.
        
        Args:
            image_path: Path to the image file
            
        Returns:
            Dictionary containing prediction results and recommendations
        """
        try:
            # Validate input
            if not os.path.exists(image_path):
                raise FileNotFoundError(f"Image file not found at {image_path}")
            
            # Preprocess image
            input_tensor = self.preprocess_image(image_path)
            
            # Make prediction
            with torch.no_grad():
                outputs = self.model(input_tensor)
                probabilities = torch.softmax(outputs, dim=1)
                confidence, predicted = torch.max(probabilities, 1)
                
                # Convert prediction to disease name
                disease_idx = predicted.item()
                disease = self.class_mapping[str(disease_idx)]
                confidence = confidence.item()
                
                # Get detailed recommendations
                recommendations = self.get_recommendations(disease)
                
                return {
                    'disease': disease,
                    'confidence': confidence,
                    'recommendations': recommendations
                }
                
        except Exception as e:
            raise RuntimeError(f"Error during prediction: {str(e)}")

def predict_disease(image_path: str) -> Dict[str, Any]:
    """
    Wrapper function to make predictions using the trained model.
    
    Args:
        image_path: Path to the image file
        
    Returns:
        Dictionary containing prediction results and recommendations
    """
    try:
        model = CropDiseaseModel()
        return model.predict(image_path)
    except Exception as e:
        # Return a safe fallback response in case of errors
        return {
            'disease': 'Unknown',
            'confidence': 0.0,
            'recommendations': {
                'immediate_actions': [
                    'Unable to process image',
                    'Please try again or contact support'
                ],
                'preventive_measures': [
                    'Regular monitoring',
                    'Consult with agricultural expert'
                ],
                'monitoring_frequency': 'Daily',
                'risk_level': 'Unknown'
            },
            'error': str(e)
        } 