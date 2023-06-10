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
  editTodo: (id: number, text: string) => void;
};

export const Todo = (props: Props) => {
  const { todo, toggleCompleted, deleteTodo, editTodo } = props;
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleDeleteClick = () => {
    setIsDeleting(true);
    setTimeout(() => {
      deleteTodo(todo.id);
    }, 500);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedText(event.target.value);
  };

  const handleEditSave = () => {
    editTodo(todo.id, editedText);
    setIsEditing(false);
  };

  return (
    <li className={`todo-item ${isDeleting ? "fadeout" : ""}`}>
      <input
        type="checkbox"
        title="toggle completed"
        checked={todo.completed}
        onChange={() => toggleCompleted(todo.id)}
      />
      {isEditing ? (
        <input
          type="text"
          className="todo-edit-input"
          value={editedText}
          onChange={handleInputChange}
        />
      ) : (
        <span
          className={todo.completed ? "todo-text completed" : "todo-text"}
          onClick={() => toggleCompleted(todo.id)}
        >
          {todo.text}
        </span>
      )}
      {isEditing ? (
        <button
          className="todo-save-btn"
          onClick={handleEditSave}
          title="save todo"
        >
          Save
        </button>
      ) : (
        <button
          className="todo-edit-btn"
          onClick={handleEditClick}
          title="edit todo"
        >
          Edit
        </button>
      )}
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
