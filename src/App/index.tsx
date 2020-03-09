import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef
} from "react";
import { v1 as uuid } from "uuid";
import { Todo } from "../type";

//css
import "./App.css";

type AppProps = {};

const todos: Todo[] = [
  {
    id: uuid(),
    desc: "Learn Redux Toolkit",
    isComplete: false
  },
  {
    id: uuid(),
    desc: "Learn Redux",
    isComplete: false
  },
  {
    id: uuid(),
    desc: "Learn React",
    isComplete: true
  },
  {
    id: uuid(),
    desc: "Learn Reducx Toolkit",
    isComplete: false
  }
];

const selectedTodoId = todos[1].id;

const App: React.FC<AppProps> = () => {
  const [todoInputText, setTodoInputText] = useState("");
  const [editTodoInputText, setEditTodoInputText] = useState("");
  const [todoCount, setTodoCount] = useState(todos.length);
  const [selectedTodo, setSelectedTodo] = useState(todos[2]);
  const [isEditMode, setIsEditMode] = useState(false);
  const editRef = useRef<HTMLInputElement>(null);

  const handleTodoInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setTodoInputText(text);
  };

  const handleEditTodoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setEditTodoInputText(text);
  };

  const handleAddTodo = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleEditTodo = () => {
    setIsEditMode(true);
    setEditTodoInputText(selectedTodo.desc);
  };
  const handleToggleTodo = () => {};
  const handleDeleteTodo = () => {};

  const handleUpdateTodo = (e: FormEvent) => {
    e.preventDefault();
    setIsEditMode(false);
  };
  const handleCancelUpdateTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsEditMode(false);
  };

  // lifecycle
  useEffect(() => {
    if (isEditMode) {
      editRef?.current?.focus();
    }
  }, [isEditMode]);

  return (
    <div className="App">
      <div className="App__counter">
        <div>Todos Updated Count: {todoCount}</div>
      </div>
      <div className="App__header">
        <h1>Todo: Redux vs RTK Edition</h1>
        <form onSubmit={handleAddTodo}>
          <label htmlFor="new-todo">Add new:</label>
          <input
            type="text"
            onChange={handleTodoInputChange}
            value={todoInputText}
          />
          <button type="submit">Create</button>
        </form>
      </div>
      <div className="App__body">
        <ul className="App__list">
          <h2>My Todos:</h2>
          {todos.map((todo, index) => (
            <li
              key={todo.id}
              onClick={e => handleSelectTodo(todo)}
              className={`${todo.isComplete ? "done" : ""}${
                todo.id === selectedTodoId ? "active" : ""
              }`}
            >
              <span className="list-number">{index + 1})</span> {todo.desc}
            </li>
          ))}
        </ul>
        <div className="App__todo-info">
          <h2>Selected Todo:</h2>
          {selectedTodo === null ? (
            <span>No Todo Selected</span>
          ) : !isEditMode ? (
            <>
              <div className={`${selectedTodo.isComplete ? "done" : ""}`}>
                {selectedTodo.desc}
              </div>
              <div className="todo-actions">
                <button onClick={handleEditTodo}>Edit</button>
                <button onClick={handleToggleTodo}>Toggle</button>
                <button onClick={handleDeleteTodo}>Delete</button>
              </div>
            </>
          ) : (
            <form onSubmit={handleUpdateTodo}>
              <label htmlFor="edit-todo">Edit: </label>
              <input
                type="text"
                id="edit-todo"
                ref={editRef}
                value={editTodoInputText}
                onChange={handleEditTodoChange}
              />
              <button type="submit">Update</button>
              <button onClick={handleCancelUpdateTodo}>Cancel</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
