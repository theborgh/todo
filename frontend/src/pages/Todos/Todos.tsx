import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { SupabaseClient, Session } from "@supabase/supabase-js";
import { Todo } from "../../components/Todo/Todo";
import Navbar from "../../components/Navbar/Navbar";
import "./Todos.css";

type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
  userid: string;
};

interface TodosProps {
  supabase: SupabaseClient;
  session: Session;
}

const Todos = ({ supabase, session }: TodosProps) => {
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
        setTodos((data as TodoItem[]) || []);
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
    const { error } = await supabase.from("todos").insert([newTodo]);
    if (error) {
      throw error;
    }
  };

  const toggleCompleted = async (id: number) => {
    try {
      const todoToUpdate = todos.find((todo) => todo.id === id);
      if (!todoToUpdate) {
        return;
      }

      const { error } = await supabase
        .from("todos")
        .update({ completed: !todoToUpdate.completed })
        .match({ id });

      if (error) {
        throw error;
      }

      setTodos(
        todos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, completed: !todoToUpdate.completed };
          } else {
            return todo;
          }
        })
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));

    try {
      const { error } = await supabase.from("todos").delete().eq("id", id);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
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

    const { error } = await supabase
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
              const form = e.target as HTMLFormElement;
              const input = form.querySelector(
                'input[name="todo"]'
              ) as HTMLInputElement;
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
