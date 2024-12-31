import mongoose, { Schema } from "mongoose";

// Define the schema for the task
const taskSchema = new Schema(
  {
    task: {
      type: String,
      required: true
    },
    isCompleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Check if the model is already defined. This prevents model overwriting during hot reloads in development
const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
