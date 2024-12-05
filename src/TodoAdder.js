import React, { useState } from 'react';
import { useTodos } from './TodoContext';

const TodoAdder = () => {
  const { addTodo } = useTodos();
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo(newTodo);
      setNewTodo("");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Добавить задачу..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Добавить</button>
    </div>
  );
};

export default TodoAdder;
