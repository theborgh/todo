import { render, screen, fireEvent } from "@testing-library/react";
import { Todo } from "./Todo";

const mockTodo = {
  id: 1,
  text: "Sample Todo",
  completed: false,
};

const mockToggleCompleted = jest.fn();
const mockDeleteTodo = jest.fn();
const mockEditTodo = jest.fn();

describe("Todo", () => {
  beforeEach(() => {
    render(
      <Todo
        todo={mockTodo}
        toggleCompleted={mockToggleCompleted}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
      />
    );
  });

  test("renders todo item with text", () => {
    const todoTextElement = screen.getByText(mockTodo.text);
    expect(todoTextElement).toBeInTheDocument();
  });

  test("toggle completed when checkbox is clicked", () => {
    const checkboxElement = screen.getByTitle("toggle completed");
    fireEvent.click(checkboxElement);
    expect(mockToggleCompleted).toHaveBeenCalledWith(mockTodo.id);
  });

  test("edit mode is activated when edit button is clicked", () => {
    const editButtonElement = screen.getByTitle("edit todo");
    fireEvent.click(editButtonElement);

    const editInput = screen.getByDisplayValue(mockTodo.text);
    expect(editInput).toBeInTheDocument();
  });

  test("edit todo when save button is clicked", () => {
    const editButtonElement = screen.getByTitle("edit todo");
    fireEvent.click(editButtonElement);

    const editInput = screen.getByDisplayValue(mockTodo.text);
    fireEvent.change(editInput, { target: { value: "Updated Todo" } });

    const saveButtonElement = screen.getByTitle("save todo");
    fireEvent.click(saveButtonElement);

    expect(mockEditTodo).toHaveBeenCalledWith(mockTodo.id, "Updated Todo");
  });
});
