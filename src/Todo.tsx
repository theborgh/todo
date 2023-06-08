import "./Todo.css";

type Props = {
  todo: {
    id: number;
    text: string;
    completed: boolean;
  };

  toggleCompleted: (id: number) => void;
  deleteTodo: (id: number) => void;
};

export const Todo = (props: Props) => {
  const { todo, toggleCompleted, deleteTodo } = props;

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleCompleted(todo.id)}
      />
      <span
        className={todo.completed ? "todo-text completed" : "todo-text"}
        onClick={() => toggleCompleted(todo.id)}
      >
        {todo.text}
      </span>
      <button className="todo-delete-btn" onClick={() => deleteTodo(todo.id)}>
        X
      </button>
    </li>
  );
};
