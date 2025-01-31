import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  next();
});

app.get('/todos', async (req, res) => {
  // const { max, search } = req.query;
  const todosFileContent = await fs.readFile('./data/todos.json');
  let todos = JSON.parse(todosFileContent);

  res.json({
    todos: todos.map((todo) => ({
      id: todo.id,
      title: todo.title,
      completed: todo.completed
    })),
  });
});

app.post('/todos', async (req, res) => {
  const { todo } = req.body;

  if (!todo) {
    return res.status(400).json({ message: 'Todo is required' });
  }

  console.log(todo);

  if (
    !todo.title?.trim() ||
    !todo.hasOwnProperty('completed')
  ) {
    return res.status(400).json({ message: 'Invalid data provided.' });
  }

  const todosFileContent = await fs.readFile('./data/todos.json');
  const todos = JSON.parse(todosFileContent);

  const newTodo = {
    id: Math.round(Math.random() * 10000).toString(),
    ...todo,
  };

  todos.push(newTodo);

  await fs.writeFile('./data/todos.json', JSON.stringify(todos));

  res.json({ todo: newTodo });
});

app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { todo } = req.body;

  if (!todo) {
    return res.status(400).json({ message: 'Todo is required' });
  }

  if (
    !todo.title?.trim() ||
    !todo.hasOwnProperty('completed')
  ) {
    return res.status(400).json({ message: 'Invalid data provided.' });
  }

  const todosFileContent = await fs.readFile('./data/todos.json');
  const todos = JSON.parse(todosFileContent);

  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  todos[todoIndex] = {
    id,
    ...todo,
  };

  await fs.writeFile('./data/todos.json', JSON.stringify(todos));

  setTimeout(() => {
    res.json({ todo: todos[todoIndex] });
  }, 1000);
});

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;

  const todosFileContent = await fs.readFile('./data/todos.json');
  const todos = JSON.parse(todosFileContent);

  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  todos.splice(todoIndex, 1);

  await fs.writeFile('./data/todos.json', JSON.stringify(todos));

  setTimeout(() => {
    res.json({ message: 'Todo deleted' });
  }, 1000);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
