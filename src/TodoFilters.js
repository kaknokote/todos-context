import React from 'react';
import { useTodos } from './TodoContext';

const TodoFilters = () => {
  const { searchQuery, setSearchQuery, isSorted, setIsSorted } = useTodos();

  return (
    <div>
      <input
        type="text"
        placeholder="Поиск..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={() => setIsSorted(!isSorted)}>
        {isSorted ? "Отключить сортировку" : "Сортировать по алфавиту"}
      </button>
    </div>
  );
};

export default TodoFilters;