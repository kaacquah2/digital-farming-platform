import requests
import firebase_admin
from firebase_admin import auth
import json

def test_health_endpoint():
    """Test the health endpoint (no auth required)"""
    response = requests.get('http://localhost:5000/api/health')
    print("\nTesting health endpoint:")
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")

def test_protected_endpoint():
    """Test a protected endpoint with invalid token"""
    headers = {'Authorization': 'Bearer invalid_token'}
    response = requests.get('http://localhost:5000/api/diseases', headers=headers)
    print("\nTesting protected endpoint with invalid token:")
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")

def test_with_valid_token():
    """Test with a valid Firebase token"""
    try:
        # Get a test user's token
        user = auth.get_user_by_email('test@example.com')  # Replace with your test user's email
        custom_token = auth.create_custom_token(user.uid)
        
        # Exchange custom token for ID token
        # Note: This part would typically be done in the frontend
        # For testing, we'll use a placeholder token
        headers = {'Authorization': f'Bearer {custom_token}'}
        response = requests.get('http://localhost:5000/api/diseases', headers=headers)
        
        print("\nTesting protected endpoint with valid token:")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"\nError testing with valid token: {str(e)}")

if __name__ == '__main__':
    print("Starting authentication tests...")
    test_health_endpoint()
    test_protected_endpoint()
    test_with_valid_token() 