import { storageService } from './storage.service.js';
import { utilService } from './util.service';

const STORAGE_KEY = 'todoDB';

export const peopleService = {
  loadTodos,
  getById,
  addTodo,
  remove,
  save,
};

function getById(personId) {
  return storageService.get(STORAGE_KEY, personId);
}

async function getTodos() {
  const todos = [
    {
      name: 'EAT',
    },
    {
      name: 'Sleep',
    },
    {
      name: 'GYM',
    },
    {
      name: 'Bake',
    },
    {
      name: 'Lol',
    },
  ];

  const todosWithId = todos.map((todo) => {
    return { ...todo, id: utilService.makeId(), isDone: false };
  });

  _saveTodosToStorage(todosWithId);
  return todosWithId;
}

async function addTodo(todo) {
  let todos = _loadTodosFromStorage();
  if (!todos) todos = [];
  const updatedTodos = [...todos, { name: todo, id: utilService.makeId(), isDone: false }];
  _saveTodosToStorage(updatedTodos);
}

function remove(todoId) {
  return storageService.removeFromStorage(STORAGE_KEY, todoId);
}

async function loadTodos(filterBy) {
  try {
    let todos = await _loadTodosFromStorage();

    if (!todos) {
      getTodos();
    }

    return todos;
  } catch (err) {
    console.log('Cannot get people', err);
  }
}

function save(person) {
  if (person.id) {
    return storageService.put(STORAGE_KEY, person);
  }
}

function _saveTodosToStorage(todosData) {
  storageService.saveToStorage(STORAGE_KEY, todosData);
}

function _loadTodosFromStorage() {
  return storageService.loadFromStorage(STORAGE_KEY);
}
