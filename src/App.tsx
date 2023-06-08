import { useState } from "react";
import "./style.css";
import { Todo } from "./Todo";

type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
};

const initialTodos: TodoItem[] = [
  { id: 1, text: "Todo 1", completed: false },
  { id: 2, text: "Todo 2", completed: true },
  { id: 3, text: "Todo 3", completed: false },
];

const App = () => {
  const [todos, setTodos] = useState<TodoItem[]>(initialTodos);

  const addTodo = (text: string) => {
    const newTodo: TodoItem = {
      id: Math.max(...todos.map((todo) => todo.id)) + 1,
      text: text,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const toggleCompleted = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      })
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <ul className="todo-list">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            toggleCompleted={toggleCompleted}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
      <div className="form-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const input = e.target.elements.todo as HTMLInputElement;
            if (input.value.trim() !== "") {
              addTodo(input.value.trim());
            }
            input.value = "";
          }}
        >
          <input
            type="text"
            name="todo"
            className="form__input"
            placeholder="Add new todo"
          />
          <button className="form__button" type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
