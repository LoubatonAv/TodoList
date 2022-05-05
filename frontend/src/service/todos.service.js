import { storageService } from './storage.service.js';
import { utilService } from './util.service';
import { httpService } from './httpService';

const STORAGE_KEY = 'todoDB';
const BASE_URL = 'todo';
export const todosService = {
  getById,
  addTodo,
  remove,
  query,
  saveTodo,
};

async function saveTodo(todo) {
  try {
    if (todo._id) {
      return httpService.put(BASE_URL, todo);
    } else {
      return httpService.post(BASE_URL, todo);
    }
  } catch (err) {
    console.log(`could not save todo `, err);
    throw err;
  }
}

function remove(todoId) {
  // return storageService.removeFromStorage(STORAGE_KEY, todoId);
  try {
    return httpService.delete(`${BASE_URL}/${todoId}`);
  } catch (err) {
    console.log('can not delete todo from server', err);
    throw err;
  }
}

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
  try {
    return httpService.post(BASE_URL, { name: todo }); //destructure the todo object and giving it the name key
  } catch (err) {
    console.log('can not add todo from server', err);
    throw err;
  }
}
// async function addTodo(todo) {
//   let todos = _loadTodosFromStorage();
//   if (!todos) todos = [];
//   const updatedTodos = [...todos, { name: todo, id: utilService.makeId(), isDone: false }];
//   _saveTodosToStorage(updatedTodos);
// }

// function save(person) {
//   if (person.id) {
//     return storageService.put(STORAGE_KEY, person);
//   }
// }

function _saveTodosToStorage(todosData) {
  storageService.saveToStorage(STORAGE_KEY, todosData);
}

function _loadTodosFromStorage() {
  return storageService.loadFromStorage(STORAGE_KEY);
}
