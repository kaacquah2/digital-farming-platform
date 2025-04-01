import torch
import torch.nn as nn
import torchvision

def create_test_model():
    # Create a simple ResNet model
    model = torchvision.models.resnet18(pretrained=False)
    num_ftrs = model.fc.in_features
    model.fc = nn.Linear(num_ftrs, 3)  # 3 classes: healthy, disease1, disease2
    
    # Initialize with random weights
    model.load_state_dict(torch.randn_like(model.state_dict()))
    
    # Save the model
    torch.save(model.state_dict(), 'models/crop_disease_model.pth')
    print("Test model created successfully!")

if __name__ == "__main__":
    create_test_model() 