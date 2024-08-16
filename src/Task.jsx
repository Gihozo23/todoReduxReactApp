import React, { useState, useRef, useEffect } from "react";
import Todos from "./Todos";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, removeTodo } from "./features/todoSlice";

function Task() {
  const inputRef = useRef(null);
  const tasks = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  // const [tasks, setTasks] = useState([]);
  const [visible, setVisible] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const newTask = inputRef.current.value.trim();
    if (newTask !== "") {
      dispatch(addTodo(newTask))
      inputRef.current.value = ""; // Clear input field
      setVisible(true);
    }
  }

  function handleDelete(index) {
    dispatch(removeTodo(index))
  }

  return (
    <div className="max-w-lg mx-auto">
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
