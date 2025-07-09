import { useState } from "react";

export function TodoInputForm({ dispatch }) {
  const [taskValue, setTaskValue] = useState("");
  return (
    <form className="flex mb-4">
      <input
        type="text"
        placeholder="Add a new task..."
        className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={taskValue}
        onChange={(e) => setTaskValue(e.target.value)}
      />
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          dispatch({ type: "addTask", payload: taskValue });
        }}
        className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 transition"
      >
        Add
      </button>
    </form>
  );
}
