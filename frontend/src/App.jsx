import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CreateTodo } from './component/CreateTodo'
import {Todos} from './component/Todos';

async function fetchTodos() {
  const resp = await fetch('http://localhost:3000/todos');
  const list = await resp.json();
  return list.todos;
}

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const todoList = await fetchTodos();
      setTodos(todoList);
    }

    fetchData();
  }, []); 

  return (
    <div>
      <CreateTodo />
      <Todos todos={todos} />
    </div>
  )
}

export default App
