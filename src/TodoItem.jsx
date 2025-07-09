import { useEffect, useRef, useState } from "react";

export default function TodoItem({ task, dispatch }) {
  const inputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState();

  function handleEdit() {
    setIsEditing(true);
    setTimeout(() => {
      if (!inputRef.current) return;
      inputRef.current.focus();
    }, 1);
  }
  function handleSaveEdit(taskName) {
    dispatch({ type: "editTask", payload: { taskName, editedName } });
    setIsEditing(false);
  }
  useEffect(
    function () {
      setEditedName(task.taskName);
      if (!inputRef.current) return;
      inputRef.current.focus();
    },
    [task.taskName]
  );

  return (
    <li className="flex items-center justify-between p-2 border-b border-gray-200">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.taskCompleted}
          onChange={() =>
            dispatch({ type: "changeTaskStatus", payload: task.taskName })
          }
          className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-500"
        />
        {isEditing ? (
          <input
            ref={inputRef}
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="text-gray-700"
            type="text"
          ></input>
        ) : (
          <span
            onClick={() =>
              dispatch({ type: "changeTaskStatus", payload: task.taskName })
            }
            className={`text-gray-700 ${
              task.taskCompleted ? "line-through" : ""
            }`}
          >
            {task.taskName}
          </span>
        )}
      </div>
      <div className="flex space-x-2">
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="text-gray-500 hover:text-blue-500 transition "
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
        ) : (
          <button
            onClick={() => handleSaveEdit(task.taskName)}
            className="text-gray-500 hover:text-blue-500 transition "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20px"
              height="20px"
              viewBox="0,0,256,256"
            >
              <g
                fill="#6a7282"
                fillRule="nonzero"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
                strokeDasharray=""
                strokeDashoffset="0"
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                nchor="none"
              >
                <g transform="scale(5.12,5.12)">
                  <path d="M25,2c-12.683,0 -23,10.317 -23,23c0,12.683 10.317,23 23,23c12.683,0 23,-10.317 23,-23c0,-4.56 -1.33972,-8.81067 -3.63672,-12.38867l-1.36914,1.61719c1.895,3.154 3.00586,6.83148 3.00586,10.77148c0,11.579 -9.421,21 -21,21c-11.579,0 -21,-9.421 -21,-21c0,-11.579 9.421,-21 21,-21c5.443,0 10.39391,2.09977 14.12891,5.50977l1.30859,-1.54492c-4.085,-3.705 -9.5025,-5.96484 -15.4375,-5.96484zM43.23633,7.75391l-19.32227,22.80078l-8.13281,-7.58594l-1.36328,1.46289l9.66602,9.01563l20.67969,-24.40039z"></path>
                </g>
              </g>
            </svg>
          </button>
        )}
        <button
          onClick={() =>
            dispatch({ type: "deleteTask", payload: task.taskName })
          }
          className="text-gray-500 hover:text-red-500 transition"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </li>
  );
}
