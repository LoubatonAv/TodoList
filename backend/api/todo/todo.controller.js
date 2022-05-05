const todoService = require('./todo.service.js');
const logger = require('../../services/logger.service');

// List

async function getTodos(req, res) {
  try {
    const filterBy = req.query;
    // console.log('querying');
    const Todos = await todoService.query(filterBy);
    res.json(Todos);
  } catch (err) {
    logger.error('Failed to get Todos', err);
    res.status(500).send({ err: 'Failer ti get Todos' });
  }
}

// Read

async function getTodoById(req, res) {
  try {
    const toyId = req.params.id;
    const todo = await todoService.getById(toyId);
    res.json(todo);
  } catch (err) {
    logger.error('Failer to get todo', err);
    res.status(500).send({ err: 'Failed to get todo' });
  }
}

// Create

async function addTodo(req, res) {
  try {
    const todo = req.body;

    const addedTodo = await todoService.add(todo);
    res.json(addedTodo);
  } catch (err) {
    logger.error('Failed to add todo', err);
    res.status(500).send({ err: 'Failed to add todo' });
  }
}

// Update

async function updateTodo(req, res) {
  try {
    const todo = req.body;
    console.log('todo:', todo);

    // console.log('todo:', todo);

    const savedTodo = await todoService.update(todo);

    res.json(savedTodo);
  } catch (err) {
    logger.error('Failed to update todo', err);
    res.status(500).send({ err: 'Failed to update todo' });
  }
}

// Delete

async function removeTodo(req, res) {
  try {
    const todoId = req.params.id;

    const removedId = todoService.remove(todoId);
    res.send(removedId);
  } catch (err) {
    logger.error('Failed to delete todo', err);
    res.status(500).send({ err: 'Failed to delete todo' });
  }
}
module.exports = {
  getTodos,
  getTodoById,
  addTodo,
  updateTodo,
  removeTodo,
};
