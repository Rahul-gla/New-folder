const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const questionRoutes = require('./routes/questions');
const contactRoutes = require('./routes/contacts'); // Import the contacts route
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000'  // Replace with your frontend URL
}));

app.use(express.json());

// Serve static files from the React app (uncomment only in production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  // Serve the React app's index.html for all other routes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }); // Remove useUnifiedTopology
      console.log('MongoDB connected');
    } catch (err) {
      console.error('MongoDB connection error:', err);
      process.exit(1);  // Exit process with failure
    }
  };
  
  connectDB();
  
// Routes
app.use('/api/questions', questionRoutes);
app.use('/api/contacts', contactRoutes); // Use the contacts route

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
