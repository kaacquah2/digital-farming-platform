import torch
import torch.nn as nn
import torchvision.transforms as transforms
from PIL import Image
import os
import json
import random
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
            # Create a default class mapping if file not found
            self.class_mapping = {
                'healthy': 0,
                'early_blight': 1,
                'late_blight': 2,
                'leaf_mold': 3,
                'septoria_leaf_spot': 4,
                'spider_mites': 5,
                'target_spot': 6,
                'yellow_leaf_curl_virus': 7,
                'mosaic_virus': 8,
                'powdery_mildew': 9,
                'downy_mildew': 10,
                'bacterial_spot': 11,
                'bacterial_wilt': 12,
                'fusarium_wilt': 13
            }
        
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
            }
        }

    def preprocess_image(self, image_path: str) -> torch.Tensor:
        """Dummy preprocessing that just returns a random tensor"""
        return torch.randn(1, 3, 224, 224)

    def get_recommendations(self, disease: str) -> Dict[str, Any]:
        """Get recommendations for a specific disease"""
        if disease not in self.recommendations:
            return {
                'immediate_actions': ['Unknown disease - please consult an expert'],
                'preventive_measures': ['Unknown disease - please consult an expert'],
                'monitoring_frequency': 'Unknown',
                'risk_level': 'Unknown'
            }
        return self.recommendations[disease]

    def predict(self, image_path: str) -> Dict[str, Any]:
        """Dummy prediction that returns random but realistic results"""
        # Generate random probabilities for each class
        all_classes = list(self.class_mapping.keys())
        probabilities = {cls: random.random() for cls in all_classes}
        
        # Normalize probabilities
        total = sum(probabilities.values())
        probabilities = {cls: prob/total for cls, prob in probabilities.items()}
        
        # Get the top prediction
        predicted_class = max(probabilities.items(), key=lambda x: x[1])[0]
        
        # Get recommendations for the predicted disease
        recommendations = self.get_recommendations(predicted_class)
        
        return {
            'predicted_class': predicted_class,
            'confidence': probabilities[predicted_class],
            'all_probabilities': probabilities,
            'recommendations': recommendations
        }

def predict_disease(image_path: str) -> Dict[str, Any]:
    """Convenience function to create a model and make a prediction"""
    model = CropDiseaseModel()
    return model.predict(image_path) 