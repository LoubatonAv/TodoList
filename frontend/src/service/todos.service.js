import { storageService } from './storage.service.js';
import { utilService } from './util.service';
import { httpService } from './httpService';

const STORAGE_KEY = 'todoDB';
const BASE_URL = 'todo';
export const todosService = {
  getById,
  addTodo,
  remove,
  save,
  query,
};

function getById(personId) {
  return storageService.get(STORAGE_KEY, personId);
}

async function query(filterBy) {
  try {
    return httpService.get(BASE_URL, filterBy);
  } catch (err) {
    console.log('cant get todos from server', err);
    throw err;
  }
}

async function addTodo(todo) {
  let todos = _loadTodosFromStorage();
  if (!todos) todos = [];
  const updatedTodos = [...todos, { name: todo, id: utilService.makeId(), isDone: false }];
  _saveTodosToStorage(updatedTodos);
}

function remove(todoId) {
  // return storageService.removeFromStorage(STORAGE_KEY, todoId);
  try {
    return httpService.delete(`${BASE_URL}/${todoId}`);
  } catch (err) {
    console.log('can not delete toy from server', err);
    throw err;
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
