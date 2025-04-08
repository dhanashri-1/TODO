let tasks = []; // Array to store tasks
let editingTaskIndex = -1; // Index of the task currently being edited

// Event listener for the "Add Task" button
document.getElementById('addTaskBtn').addEventListener('click', addOrUpdateTask);

// Function to add or update a task
function addOrUpdateTask() {
    const taskText = document.getElementById('taskInput').value;
    const dueDate = document.getElementById('dueDateInput').value;
    const targetDate = document.getElementById('targetDateInput').value;
    const dueTime = document.getElementById('dueTimeInput').value;
    const targetDay = document.getElementById('targetDayInput').value;

    // Check for empty fields
    if (!taskText || !dueDate || !targetDate || !dueTime || !targetDay) {
        alert('Please fill in all fields');
        return;
    }

    // Create task object
    const task = {
        text: taskText,
        dueDate,
        targetDate,
        dueTime,
        targetDay,
        completed: false
    };

    // If editing a task, update the existing task
    if (editingTaskIndex > -1) {
        tasks[editingTaskIndex] = task; // Update task
        editingTaskIndex = -1; // Reset editing index
        alert('Task updated successfully.');
    } else {
        tasks.push(task); // Add new task
        alert('Task added successfully.');
    }

    // Update the UI
    updateTaskList();
    
    // Clear input fields after adding/updating task
    clearInputFields();
}

// Function to update the task list in the UI
function updateTaskList(filter = 'all') {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear existing tasks

    // Filter tasks based on the selected filter
    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true; // Show all tasks
    });

    // Add tasks to the UI
    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = `${task.text} (Due: ${task.dueDate}, Target: ${task.targetDate}, Time: ${task.dueTime}, Day: ${task.targetDay})`;
        li.classList.add(task.completed ? 'completed' : 'pending'); // Add class based on completion

        // Edit symbol (✏️)
        const editSymbol = document.createElement('span');
        editSymbol.textContent = '✏️'; // Edit symbol
        editSymbol.onclick = () => editTask(index);
        editSymbol.style.cursor = 'pointer'; // Change cursor to pointer
        li.appendChild(editSymbol);

        // Complete symbol (✔️)
        const completeSymbol = document.createElement('span');
        completeSymbol.textContent = task.completed ? '🔄' : '✔️'; // Toggle symbols
        completeSymbol.onclick = () => toggleCompletion(index);
        completeSymbol.style.cursor = 'pointer'; // Change cursor to pointer
        li.appendChild(completeSymbol);

        // Delete symbol (🗑️)
        const deleteSymbol = document.createElement('span');
        deleteSymbol.textContent = '🗑️'; // Delete symbol
        deleteSymbol.onclick = () => deleteTask(index);
        deleteSymbol.style.cursor = 'pointer'; // Change cursor to pointer
        li.appendChild(deleteSymbol);

        taskList.appendChild(li);
    });
}

// Function to toggle task completion status
function toggleCompletion(index) {
    tasks[index].completed = !tasks[index].completed; // Toggle the completed status
    updateTaskList(); // Update the displayed list
}

// Function to edit a task
function editTask(index) {
    const task = tasks[index];
    document.getElementById('taskInput').value = task.text;
    document.getElementById('dueDateInput').value = task.dueDate;
    document.getElementById('targetDateInput').value = task.targetDate;
    document.getElementById('dueTimeInput').value = task.dueTime;
    document.getElementById('targetDayInput').value = task.targetDay;
    editingTaskIndex = index; // Set the editing index
}

// Function to clear input fields
function clearInputFields() {
    document.getElementById('taskInput').value = '';
    document.getElementById('dueDateInput').value = '';
    document.getElementById('targetDateInput').value = '';
    document.getElementById('dueTimeInput').value = '';
    document.getElementById('targetDayInput').value = '';
}

// Update the target day based on the target date
document.getElementById('targetDateInput').addEventListener('change', function () {
    const targetDateValue = this.value;
    if (targetDateValue) {
        const targetDate = new Date(targetDateValue);
        const options = { weekday: 'long' }; // Get the full name of the day
        const targetDay = targetDate.toLocaleDateString('en-US', options); // Format the day

        // Set the target day input value
        document.getElementById('targetDayInput').value = targetDay;
    }
});

// Filter buttons functionality
document.getElementById('allTasksBtn').addEventListener('click', () => updateTaskList('all'));
document.getElementById('completedTasksBtn').addEventListener('click', () => updateTaskList('completed'));
document.getElementById('pendingTasksBtn').addEventListener('click', () => updateTaskList('pending'));

// Function to delete a task
function deleteTask(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks.splice(index, 1); // Remove task from the array
        updateTaskList(); // Update the displayed list
        alert('Task deleted successfully.');
    }
}
