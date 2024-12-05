import React from 'react';
import { useTodos } from './TodoContext';

const TodoList = () => {
  const { todos, deleteTodo, updateTodo } = useTodos();

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input
            type="text"
            defaultValue={todo.title}
            onBlur={(e) => updateTodo(todo.id, e.target.value)}
          />
          <button onClick={() => deleteTodo(todo.id)}>Удалить</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;