const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'static', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Use timestamp to ensure unique filenames
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, JPG, and PNG files are allowed.'));
    }
  }
});

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/static', express.static(path.join(__dirname, 'static')));

// Set up view engine (we'll serve the HTML directly instead)
app.set('view engine', 'html');

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

// Process image endpoint (equivalent to Flask's /process_image)
app.post('/process_image', upload.single('file'), async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.json({
        success: false,
        error: 'No file uploaded'
      });
    }

    // Process the image (placeholder implementation)
    const result = await processImage(req.file.path, req.file.filename);
    
    if (result.error) {
      return res.json({
        success: false,
        error: result.error
      });
    }

    // Return the result
    res.json({
      success: true,
      detections: [{
        class: result.label,
        confidence: result.confidence / 100 // Convert to 0-1 range
      }],
      processed_image: `/static/uploads/${req.file.filename}`
    });

  } catch (error) {
    console.error('Error processing image:', error);
    res.json({
      success: false,
      error: error.message || 'An error occurred while processing the image'
    });
  }
});

// Function to process image (placeholder implementation)
async function processImage(imgPath, filename) {
  try {
    // Simulate model prediction
    const prediction = 0.73; // Placeholder prediction
    const label = prediction > 0.5 ? 'uniform' : 'non_uniform';
    const confidence = prediction > 0.5 ? prediction * 100 : (1 - prediction) * 100;
    
    return {
      label: label,
      confidence: confidence
    };
  } catch (error) {
    console.error('Image processing error:', error);
    return {
      error: error.message
    };
  }
}

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});