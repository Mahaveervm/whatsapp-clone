const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import CORS package
const chatRoutes = require('./routes/chatRoutes');
const db = require('./config/db'); // Ensure database connection is established

const app = express();

// Enable CORS for all origins (you can restrict this to specific origins later)
app.use(cors());

// Middleware
app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://localhost:3000',  // Replace with your frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));

// Routes
app.use('/chat', chatRoutes);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
