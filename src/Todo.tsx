import { useState } from "react";
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
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleting(true);
    setTimeout(() => {
      deleteTodo(todo.id);
    }, 500);
  };

  return (
    <li className={`todo-item ${isDeleting ? "fadeout" : ""}`}>
      <input
        type="checkbox"
        title="toggle completed"
        checked={todo.completed}
        onChange={() => toggleCompleted(todo.id)}
      />
      <span
        className={todo.completed ? "todo-text completed" : "todo-text"}
        onClick={() => toggleCompleted(todo.id)}
      >
        {todo.text}
      </span>
      <button
        className="todo-delete-btn"
        onClick={handleDeleteClick}
        title="delete todo"
      >
        X
      </button>
    </li>
  );
};
