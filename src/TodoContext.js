import React, { createContext, useContext, useState, useEffect } from 'react';

const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSorted, setIsSorted] = useState(false);
  const API_URL = 'http://localhost:5000/todos';

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
        return response.json();
      })
      .then((data) => setTodos(data))
      .catch((error) => console.error('Ошибка загрузки данных:', error));
  }, []);

  const addTodo = (newTodo) => {
    const newTask = { title: newTodo, completed: false };
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((task) => setTodos([...todos, task]));
  };

  const deleteTodo = (id) => {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => setTodos(todos.filter((todo) => todo.id !== id)));
  };

  const updateTodo = (id, updatedTitle) => {
    const updatedTask = { title: updatedTitle, completed: false };
    fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    })
      .then((res) => res.json())
      .then((task) =>
        setTodos(todos.map((todo) => (todo.id === id ? task : todo)))
      );
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTodos = isSorted
    ? [...filteredTodos].sort((a, b) => a.title.localeCompare(b.title))
    : filteredTodos;

  return (
    <TodoContext.Provider
      value={{
        todos: sortedTodos,
        addTodo,
        deleteTodo,
        updateTodo,
        searchQuery,
        setSearchQuery,
        isSorted,
        setIsSorted,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

const useTodos = () => useContext(TodoContext);

export { TodoProvider, useTodos };
