import React, { useState } from "react";
import axios from "axios";

function CreateTask({ fetchTasks,handleTaskFetch }) {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (!task) return; // Prevent adding empty tasks

    axios
      .post("http://localhost:3001/api/add", { task })
      .then((res) => {
        console.log("Task added:", res);
        fetchTasks(); // Refresh task list after adding
        setTask(""); // Clear the input field
        handleTaskFetch();
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  return (
    <div className="flex mb-6 space-x-4">
      <input
        type="text"
        placeholder="Add a new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="flex-1 border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Add Task
      </button>
    </div>
  );
}

export default CreateTask;
