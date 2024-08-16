import React, { useState } from "react";

function Todos(props) {
  const [checkbox, setCheckbox] = useState(false);

  function handleChecked() {
    setCheckbox(!checkbox);
  }

  return (
    <div className="flex justify-between items-center bg-gray-200 p-4 rounded-lg shadow-sm mb-2">
      <div className="flex items-center">
        <input
          onClick={handleChecked}
          type="checkbox"
          className=" h-5 w-5 text-green-600"
        />
        <p
          className={`ml-3 text-lg ${checkbox ? "line-through text-gray-500" : ""}`}
        >
          {props.task}
        </p>
      </div>
      <button
        onClick={() => props.handleDelete(props.index)}
        className="text-red-500 hover:text-red-700 transition-colors duration-200"
      >
        <img name="delete" src="/trash.svg" className="w-5 h-5" alt="Delete" />
      </button>
    </div>
  );
}

export default Todos;
