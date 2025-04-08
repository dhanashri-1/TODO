const express = require('express');
const router = express.Router();

// Sample tasks array for demonstration; in a real application, this would likely come from a database
let tasks = []; // Initialize tasks as an empty array
let editingTaskIndex = -1; // Track the index of the task being edited

// Route to get all tasks
router.get('/', (req, res) => {
    res.json(tasks); // Return tasks as JSON
});

// Route to add a task
router.post('/', (req, res) => {
    const task = req.body;
    tasks.push(task);
    res.status(201).json(task); // Respond with the created task
});

// Route to update a task
router.put('/:index', (req, res) => {
    const index = req.params.index;
    if (index >= 0 && index < tasks.length) {
        tasks[index] = req.body;
        res.json(tasks[index]); // Respond with the updated task
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});

// Route to delete a task
router.delete('/:index', (req, res) => {
    const index = req.params.index;
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1); // Remove task from the array
        res.status(204).send(); // No content to return
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});

module.exports = router;
