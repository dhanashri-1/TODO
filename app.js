const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const tasksRouter = require('./routes/tasks'); // Importing the tasks route

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JavaScript) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Use the tasks routes for handling API requests
app.use('/api/tasks', tasksRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
app.get('/api/test', (req, res) => {
    res.json({ message: 'Connection successful!' });
});