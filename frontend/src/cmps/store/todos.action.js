import { todosService } from '../../service/todos.service';

export function loadTodos() {
  return (dispatch, getState) => {
    const { filterBy } = getState().todoModule;
    todosService.query(filterBy).then((todo) => {
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
    todosService.addTodo(todo).then(() => {
      const action = { type: 'ADD_TODO', todo };
      dispatch(action);
    });
  };
}

export function removeTodo(todoId) {
  return async (dispatch) => {
    try {
      todosService.remove(todoId).then(() => {
        const action = { type: 'REMOVE_TODO', todoId };
        dispatch(action);
      });
      return todoId;
    } catch (err) {
      console.log('cant remove toy', err);
    }
  };
}

export function updateTodo(todo) {
  return (dispatch) => {
    todosService
      .save(todo)
      .then((savedTodo) => {
        const action = { type: 'UPDATE_TODO', todo: savedTodo };
        dispatch(action);
      })
      .catch((err) => {});
  };
}
