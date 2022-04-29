import { peopleService } from '../../service/people.service.js';

export function loadTodos() {
  return (dispatch, getState) => {
    const { filterBy } = getState().todoModule;
    peopleService.loadTodos(filterBy).then((todo) => {
      const action = { type: 'SET_TODOS', todos: todo };
      dispatch(action);
    });
  };
}

export function setFilterBy(filterBy) {
  return (dispatch) => {
    const action = { type: 'SET_FILTER', filterBy };
    dispatch(action);
  };
}

export function addTodo(todo) {
  return (dispatch, getState) => {
    peopleService.addTodo(todo).then(() => {
      const action = { type: 'ADD_TODO', todo };
      dispatch(action);
    });
  };
}

export function removeTodo(todoId) {
  return (dispatch) => {
    peopleService.remove(todoId).then(() => {
      const action = { type: 'REMOVE_TODO', todoId };
      dispatch(action);
    });
  };
}

export function updateTodo(todo) {
  return (dispatch) => {
    peopleService
      .save(todo)
      .then((savedTodo) => {
        const action = { type: 'UPDATE_TODO', todo: savedTodo };
        dispatch(action);
      })
      .catch((err) => {});
  };
}
