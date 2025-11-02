# Uniform Detection - Node.js/Express Version

This is the Node.js/Express.js conversion of the original Flask-based uniform detection application. It maintains the same functionality with a modern JavaScript backend.

---

## 🚀 **LIVE DEMO**

🔥 **Try it out now:**  
👉 **[OPEN UNIFORM DETECTION MODEL APP](https://uniform-detection-model.streamlit.app/)**  

[![Open in Streamlit](https://static.streamlit.io/badges/streamlit_badge_black_white.svg)](https://uniform-detection-model.streamlit.app/)

---

## Features

- Real-time uniform detection using AI/ML
- Image upload and camera capture capabilities
- Responsive web interface with modern UI
- Real-time processing and visualization

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

To start the development server:
```bash
npm run dev
```

To start the production server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
.
├── server.js              # Main Express.js server file
├── package.json           # Project dependencies and scripts
├── templates/             # HTML templates
│   └── index.html         # Main application page
├── static/                # Static assets
│   ├── css/
│   │   └── style.css      # Application styles
│   └── js/
│       └── script.js      # Frontend JavaScript
├── model/                 # ML model files
│   └── uniform_model.keras # Pre-trained model
└── README.md              # This file
```

## API Endpoints

- `GET /` - Serve the main application page
- `POST /process_image` - Process uploaded images for uniform detection

## Dependencies

- Express.js - Web framework
- Multer - File upload handling
- Sharp - Image processing
- OpenCV4Node.js - Computer vision library
- TensorFlow.js - Machine learning library

## How It Works

1. Users can upload images or capture photos using their device camera
2. Images are processed using a pre-trained TensorFlow model
3. The model detects whether a person in the image is wearing a uniform
4. Results are displayed with confidence scores and visual indicators



## Converting from Flask

This project was converted from a Flask application. Key changes include:
- Replaced Flask routes with Express.js endpoints
- Converted Python image processing to Node.js equivalents
- Maintained the same frontend interface and functionality
- Preserved the same API contract for frontend compatibility
