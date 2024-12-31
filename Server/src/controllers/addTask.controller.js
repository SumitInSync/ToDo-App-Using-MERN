import Task from "../models/Addingtask.models.js";

export const addTask = async (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ error: "Task is required" });
  }
  const newTask = new Task({ task });

  try {
    await newTask.save();
    res.status(200).send("Task added successfully");
  } catch (error) {
    res.status(500).send("Error adding task " + error);
  }
};

// Get all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find(); // Get all tasks from the database
    res.status(200).json(tasks); // Send tasks as response
  } catch (error) {
    res.status(500).send("Error fetching tasks: " + error);
  }
};

// Delete a task by ID
export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.taskId); // Delete task by ID
    res.status(200).send("Task deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting task: " + error);
  }
};

// Update a task by ID
// isCompleted = false
export const updateTask = async (req, res) => {
  const { task, isCompleted } = req.body;
  try {
    await Task.findByIdAndUpdate(req.params.taskId, {
      task: task,
      isCompleted: isCompleted
    }); // Update task by ID
    res.status(200).send("Task updated successfully");
  } catch (error) {
    res.status(500).send("Error updating task: " + error);
  }
};

// In your controller file (e.g., addTask.controller.js)

export const completionOfTask = async (req, res) => {
  const { id } = req.params;
  const { isCompleted } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, { isCompleted });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).send("Error updating task " + error);
  }
};
