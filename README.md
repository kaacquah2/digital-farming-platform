# Digital Farming Platform

A comprehensive web application for modern farming management, featuring real-time analytics, marketplace integration, and AI-powered assistance.

## Features

- 🌱 Crop Management
- 📊 Analytics Dashboard
- 🛍️ Marketplace Integration
- 🤖 AI-Powered Disease Detection
- 💬 Live Chat Support
- 🔔 Real-time Notifications
- 👤 User Authentication
- 📱 Responsive Design

## Tech Stack

- Frontend:
  - React
  - TypeScript
  - Material-UI
  - Firebase Authentication
  - OpenAI Integration

- Backend:
  - Python
  - Flask
  - Firebase Admin SDK
  - OpenAI API

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Python (v3.8 or higher)
- Firebase account
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/digital-farming-platform.git
cd digital-farming-platform
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your Firebase and OpenAI credentials

5. Start the development server:
```bash
# Start frontend
npm start

# Start backend (in a separate terminal)
python app.py
```

## Environment Variables

Create a `.env` file with the following variables:

```
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
OPENAI_API_KEY=your_openai_api_key
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Material-UI for the component library
- Firebase for authentication and backend services
- OpenAI for AI capabilities 