import express from "express";
import {
  addTask,
  getTasks,
  deleteTask,
  updateTask,
  completionOfTask
} from "../controllers/addTask.controller.js"; // Import controller functions

const router = express.Router();

// Route to add a new task
router.post("/add", addTask);

// Route to get all tasks
router.get("/tasks", getTasks);

// Route to delete a task by ID
router.delete("/tasks/:taskId", deleteTask);

// Route to update a task by ID
router.put("/tasks/:taskId", updateTask);

router.put("/tasks/completionOfTask/:id", completionOfTask); // Route to update task completion status

export default router;
