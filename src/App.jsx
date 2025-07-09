import { Header } from "./Header";
import { TodoInputForm } from "./TodoInputForm";
import TodoList from "./TodoList";
import { Filters } from "./Filters";
import { useReducer } from "react";

const initialState = {
  tasks: [
    { taskName: "Clean the car", taskCompleted: false },
    { taskName: "Do Homeworks", taskCompleted: true },
  ],
  filteredTasks: [
    { taskName: "Clean the car", taskCompleted: false },
    { taskName: "Do Homeworks", taskCompleted: true },
  ],
  filter: "all",
};

function reducer(state, action) {
  switch (action.type) {
    case "addTask":
      if (
        state.tasks.some(
          (task) => task.taskName.toLowerCase() === action.payload.toLowerCase()
        )
      ) {
        alert("repetive task");
        return state;
      }
      if (!action.payload) return state;
      return {
        ...state,
        tasks: [
          { taskName: action.payload, taskCompleted: false },
          ...state.tasks,
        ],
        filteredTasks: [
          { taskName: action.payload, taskCompleted: false },
          ...state.tasks,
        ].filter((task) => {
          if (state.filter === "all") return true;
          if (state.filter === "active") return task.taskCompleted === false;
          if (state.filter === "completed") return task.taskCompleted === true;
        }),
      };

    case "deleteTask":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.taskName !== action.payload),
        filteredTasks: state.tasks
          .filter((task) => task.taskName !== action.payload)
          .filter((task) => {
            if (state.filter === "all") return true;
            if (state.filter === "active") return task.taskCompleted === false;
            if (state.filter === "completed")
              return task.taskCompleted === true;
          }),
      };

    case "editTask":
      return {
        ...state,
        tasks: [
          {
            ...state.tasks.find(
              (task) => task.taskName === action.payload.taskName
            ),
            taskName: action.payload.editedName,
          },
          ...state.tasks.filter(
            (task) => task.taskName !== action.payload.taskName
          ),
        ],
        filteredTasks: [
          {
            ...state.tasks.find(
              (task) => task.taskName === action.payload.taskName
            ),
            taskName: action.payload.editedName,
          },
          ...state.tasks.filter(
            (task) => task.taskName !== action.payload.taskName
          ),
        ].filter((task) => {
          if (state.filter === "all") return true;
          if (state.filter === "active") return task.taskCompleted === false;
          if (state.filter === "completed") return task.taskCompleted === true;
        }),
      };

    case "changeTaskStatus":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.taskName === action.payload
            ? { ...task, taskCompleted: !task.taskCompleted }
            : task
        ),
        filteredTasks: state.tasks
          .map((task) =>
            task.taskName === action.payload
              ? { ...task, taskCompleted: !task.taskCompleted }
              : task
          )
          .filter((task) => {
            if (state.filter === "all") return true;
            if (state.filter === "active") return task.taskCompleted === false;
            if (state.filter === "completed")
              return task.taskCompleted === true;
          }),
      };

    case "clearCompleted":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.taskCompleted === false),
        filteredTasks: state.tasks
          .filter((task) => task.taskCompleted === false)
          .filter((task) => {
            if (state.filter === "all") return true;
            if (state.filter === "active") return task.taskCompleted === false;
            if (state.filter === "completed")
              return task.taskCompleted === true;
          }),
      };
    // Filters
    case "filterAll":
      return {
        ...state,
        filter: "all",
        filteredTasks: state.tasks,
      };
    case "filterActive":
      return {
        ...state,
        filter: "active",
        filteredTasks: state.tasks.filter(
          (task) => task.taskCompleted === false
        ),
      };
    case "filterCompleted":
      return {
        ...state,
        filter: "completed",
        filteredTasks: state.tasks.filter(
          (task) => task.taskCompleted === true
        ),
      };
    default:
      throw new Error("unknown action");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen font-sans">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <Header />

        <TodoInputForm tasks={state.filteredTasks} dispatch={dispatch} />

        <TodoList tasks={state.filteredTasks} dispatch={dispatch} />

        <Filters filter={state.filter} dispatch={dispatch} />
      </div>
    </div>
  );
}

export default App;
