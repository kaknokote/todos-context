import React from 'react';
import { TodoProvider } from './TodoContext';
import TodoAdder from './TodoAdder';
import TodoFilters from './TodoFilters';
import TodoList from './TodoList';

function App() {
  return (
    <TodoProvider>
      <TodoAdder />
      <TodoFilters />
      <TodoList />
    </TodoProvider>
  );
}

export default App;