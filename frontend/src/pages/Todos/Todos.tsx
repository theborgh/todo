import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Todo } from "../../components/Todo/Todo";
import Navbar from "../../components/Navbar/Navbar";
import "./Todos.css";

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

const Todos = ({ supabase, session }) => {
  const [todos, setTodos] = useState<TodoItem[]>(initialTodos);
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate("/");
    }
  }, []);

  const createOrUpdateTodo = async (todo: TodoItem) => {
    try {
      if (todo.id) {
        // Update existing todo
        const { data, error } = await supabase
          .from("todos")
          .update(todo)
          .match({ id: todo.id });
        if (error) {
          throw error;
        }
        console.log("Todo updated:", data);
      } else {
        // Create new todo
        const { data, error } = await supabase.from("todos").insert([todo]);
        if (error) {
          throw error;
        }
        console.log("New todo created:", data);
      }
    } catch (error) {
      console.error("Error creating/updating todo:", error);
    }
  };

  const addTodo = async (text: string) => {
    const newTodo: TodoItem = {
      id: Math.max(...todos.map((todo) => todo.id)) + 1,
      text: text,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    const { data, error } = await supabase.from("todos").insert([newTodo]);
    if (error) {
      throw error;
    }
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

  const editTodo = async (id: number, text: string) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, text: text };
        } else {
          return todo;
        }
      })
    );

    const { data, error } = await supabase
      .from("todos")
      .update({ text })
      .match({ id });
    if (error) {
      throw error;
    }
  };

  return (
    <div className="Todos">
      <Navbar supabase={supabase} session={session} />
      <h1 className="title">Todo List</h1>
      <div className="container">
        <ul className="todo-list">
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              toggleCompleted={toggleCompleted}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
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
              minLength={5}
            />
            <button className="form__button" type="submit">
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Todos;
