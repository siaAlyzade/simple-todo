export function Filters({ filter, dispatch }) {
  return (
    <div className="flex justify-between items-center max-sm:items-start mt-4">
      <div className="flex max-sm:flex-col max-sm:gap-2 space-x-2">
        <button
          onClick={() => dispatch({ type: "filterAll", payload: true })}
          className={`px-3 py-1  rounded-md  transition ${
            filter === "all"
              ? "text-white bg-blue-500 hover:bg-blue-600 "
              : "text-gray-700  bg-gray-200 hover:bg-gray-300"
          }  `}
        >
          All
        </button>
        <button
          onClick={() => dispatch({ type: "filterActive", payload: true })}
          className={`px-3 py-1  rounded-md  transition ${
            filter === "active"
              ? "text-white bg-blue-500 hover:bg-blue-600"
              : "text-gray-700  bg-gray-200 hover:bg-gray-300"
          } `}
        >
          Active
        </button>
        <button
          onClick={() => dispatch({ type: "filterCompleted", payload: true })}
          className={`px-3 py-1   rounded-md  transition ${
            filter === "completed"
              ? "text-white bg-blue-500 hover:bg-blue-600"
              : "text-gray-700 bg-gray-200 hover:bg-gray-300"
          } `}
        >
          Completed
        </button>
      </div>
      <button
        onClick={() => dispatch({ type: "clearCompleted" })}
        className="text-red-500 hover:text-red-600 transition text-sm"
      >
        Clear Completed
      </button>
    </div>
  );
}
