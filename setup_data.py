import os
import shutil
from pathlib import Path
import random
from tqdm import tqdm

def create_directory_structure():
    """Create the necessary directories for training data."""
    base_dirs = ['data/train', 'data/val']
    disease_categories = [
        'healthy',
        'early_blight',
        'late_blight',
        'leaf_mold',
        'septoria_leaf_spot',
        'spider_mites',
        'target_spot',
        'yellow_leaf_curl_virus',
        'mosaic_virus',
        'powdery_mildew',
        'downy_mildew',
        'bacterial_spot',
        'bacterial_wilt',
        'fusarium_wilt',
        'root_rot'
    ]
    
    for base_dir in base_dirs:
        for category in disease_categories:
            Path(os.path.join(base_dir, category)).mkdir(parents=True, exist_ok=True)

def split_dataset(source_dir, train_dir, val_dir, split_ratio=0.8):
    """Split the dataset into training and validation sets."""
    for category in os.listdir(source_dir):
        category_dir = os.path.join(source_dir, category)
        if not os.path.isdir(category_dir):
            continue
            
        # Get all images in the category
        images = [f for f in os.listdir(category_dir) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
        random.shuffle(images)
        
        # Calculate split point
        split_point = int(len(images) * split_ratio)
        
        # Split into train and val
        train_images = images[:split_point]
        val_images = images[split_point:]
        
        # Copy files to respective directories
        for img in tqdm(train_images, desc=f"Copying {category} to train"):
            src = os.path.join(category_dir, img)
            dst = os.path.join(train_dir, category, img)
            shutil.copy2(src, dst)
            
        for img in tqdm(val_images, desc=f"Copying {category} to val"):
            src = os.path.join(category_dir, img)
            dst = os.path.join(val_dir, category, img)
            shutil.copy2(src, dst)

def create_data_info():
    """Create a JSON file with information about the dataset."""
    import json
    
    data_info = {
        'diseases': {},
        'total_images': 0,
        'train_images': 0,
        'val_images': 0
    }
    
    for split in ['train', 'val']:
        split_dir = f'data/{split}'
        for category in os.listdir(split_dir):
            category_dir = os.path.join(split_dir, category)
            if not os.path.isdir(category_dir):
                continue
                
            num_images = len([f for f in os.listdir(category_dir) 
                            if f.lower().endswith(('.png', '.jpg', '.jpeg'))])
            
            if category not in data_info['diseases']:
                data_info['diseases'][category] = {
                    'total': 0,
                    'train': 0,
                    'val': 0
                }
            
            data_info['diseases'][category][split] = num_images
            data_info['diseases'][category]['total'] += num_images
            data_info[f'{split}_images'] += num_images
            data_info['total_images'] += num_images
    
    with open('data_info.json', 'w') as f:
        json.dump(data_info, f, indent=4)

def main():
    # Create directory structure
    print("Creating directory structure...")
    create_directory_structure()
    
    # Split dataset (assuming source images are in 'source_images' directory)
    print("\nSplitting dataset...")
    split_dataset('source_images', 'data/train', 'data/val')
    
    # Create dataset information
    print("\nCreating dataset information...")
    create_data_info()
    
    print("\nDataset setup complete!")

if __name__ == '__main__':
    main() 