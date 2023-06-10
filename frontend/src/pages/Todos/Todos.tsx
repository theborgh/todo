import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Todo } from "../../components/Todo/Todo";
import Navbar from "../../components/Navbar/Navbar";
import "./Todos.css";

type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
  userid: string;
};

const Todos = ({ supabase, session }) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate("/");
    }

    const fetchTodos = async () => {
      try {
        const { data, error } = await supabase.from("todos").select("*");
        if (error) {
          throw error;
        }
        setTodos(data || []);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async (text: string) => {
    const newTodo: TodoItem = {
      id: todos.length ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1,
      text: text,
      completed: false,
      userid: session.user.id,
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
