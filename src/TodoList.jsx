import TodoItem from "./TodoItem";

export default function TodoList({ tasks, dispatch }) {
  if (!tasks.length) return <p>No Tasks! use input to add one.</p>;
  return (
    <ul className="space-y-2 max-h-80 overflow-y-auto">
      {tasks.map((task) => (
        <TodoItem task={task} dispatch={dispatch} key={task.taskName} />
      ))}
    </ul>
  );
}
{
  /* <TodoItem taskName="Buy Groccery" completed={false} />
      <TodoItem  /> */
}
