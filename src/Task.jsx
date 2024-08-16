import React, { useState, useRef, useEffect } from "react";
import Todos from "./Todos";

function Task() {
  const inputRef = useRef(null);
  const [tasks, setTasks] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks);
        if (Array.isArray(parsedTasks)) {
          setTasks(parsedTasks);
          setVisible(parsedTasks.length > 0);
        }
      } catch (error) {
        console.error("Failed to parse tasks from local storage:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  function handleSubmit(event) {
    event.preventDefault();
    const newTask = inputRef.current.value.trim();
    if (newTask !== "") {
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, newTask];
        inputRef.current.value = ""; // Clear input field
        return updatedTasks;
      });
      setVisible(true);
    }
  }

  function handleDelete(index) {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks.splice(index, 1);
      return updatedTasks;
    });
  }

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-4">Todo List</h1>
      <div className="flex justify-center mb-6">
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            ref={inputRef}
            className="border rounded-l-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            type="text"
            placeholder="Add todo..."
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-r-md hover:bg-green-600 transition"
          >
            +
          </button>
        </form>
      </div>
      <div className="space-y-2">
        {visible &&
          tasks.map((task, index) => (
            <Todos
              key={index}
              index={index}
              task={task}
              handleDelete={() => handleDelete(index)}
            />
          ))}
      </div>
    </div>
  );
}

export default Task;
