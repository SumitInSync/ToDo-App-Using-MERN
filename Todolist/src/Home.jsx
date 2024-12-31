import { useState, useEffect, useCallback } from "react";
import CreateTask from "./CreateTask";
import axios from "axios";

function Home() {
  const [todos, setTodos] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  const handleTaskFetch = useCallback(async () => {
    try {
      const fetchAllTask = await axios.get(`http://localhost:3001/api/tasks`);
      if (fetchAllTask.data) {
        console.log(fetchAllTask.data);
        setTodos(fetchAllTask.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    handleTaskFetch();
  }, [handleTaskFetch]);

  const handleEdit = (id, task) => {
    setEditTaskId(id);
    setEditedTask(task);
  };

  const handleSave = (id) => {
    axios
      .put(`http://localhost:3001/api/tasks/${id}`, { task: editedTask })
      .then(() => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, task: editedTask } : todo
          )
        );
        setEditTaskId(null); // Close edit mode
      })
      .catch((err) => console.log(err));
  };

  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:3001/api/tasks/${id}`)
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      })
      .catch((err) => console.log(err));
  };

  const handleCheckboxChange = (id, completed) => {
    axios
      .put(`http://localhost:3001/api/tasks/${id}`, { completed: !completed })
      .then(() => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, completed: !completed } : todo
          )
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-xl mx-auto mt-10">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">
        Todo List
      </h2>
      <CreateTask
        fetchTasks={() => setTodos(todos)}
        handleTaskFetch={handleTaskFetch}
      />
      {todos.length === 0 ? (
        <div className="text-center text-gray-500 mt-4">No tasks added</div>
      ) : (
        <div className="space-y-4 mt-6">
          {todos.map((todo) => (
            <div
              key={todo._id}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm hover:bg-gray-200 transition duration-200"
            >
              <div className="flex items-center space-x-4">
                {/* Circular Checkbox */}
                <CheckBox
                  isCompleted={todo.isCompleted}
                  editTaskId={editTaskId}
                  todoId={todo._id}
                  editedTask={editedTask}
                  setEditedTask={setEditedTask}
                  task={todo.task}
                />
                {/* Editable Task Text */}
              </div>

              {/* Buttons for Edit, Save, and Delete */}
              <div className="space-x-2">
                {editTaskId === todo._id ? (
                  <button
                    onClick={() => handleSave(todo._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(todo._id, todo.task)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => deleteTask(todo._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const CheckBox = ({
  isCompleted,
  editTaskId,
  todoId,
  editedTask,
  setEditedTask,
  task
}) => {
  const [checkValue, setCheckValue] = useState(isCompleted);
  const [firstRender, setFirstRender] = useState(false);

  const handleCheckValueUpdate = useCallback(async () => {
    try {
      if (firstRender === false) {
        setFirstRender(true);
        return;
      }
      const fetchCheckValueUpdate = await axios.put(
        `http://localhost:3001/api/tasks/completionOfTask/${todoId}`,
        {
          isCompleted: checkValue
        }
      );
      if (fetchCheckValueUpdate.data) {
        console.log("check box:", fetchCheckValueUpdate.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [checkValue, todoId]);

  useEffect(() => {
    handleCheckValueUpdate();
  }, [handleCheckValueUpdate]);

  return (
    <>
      {" "}
      <label className="relative flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checkValue}
          className="hidden"
          onClick={() => {
            setCheckValue((prev) => !prev);
          }}
        />
        <div
          className={`w-6 h-6 flex items-center justify-center border-2 border-gray-300 rounded-full ${
            checkValue ? "bg-green-500 border-green-500" : "bg-white"
          }`}
        >
          {checkValue && (
            <svg
              className="w-4 h-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
      </label>
      {editTaskId === todoId ? (
        <input
          type="text"
          value={editedTask}
          onChange={(e) => setEditedTask(e.target.value)}
          className="text-lg text-gray-700 border-2 border-gray-300 p-2 rounded-lg"
        />
      ) : (
        <span
          className={`text-lg ${
            checkValue ? "line-through text-gray-500" : "text-gray-700"
          }`}
        >
          {task}
        </span>
      )}
    </>
  );
};

export default Home;
