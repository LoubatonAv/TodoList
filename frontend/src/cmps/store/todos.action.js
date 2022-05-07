import { todosService } from '../../service/todos.service';

export function loadTodos(filterBy) {
  return (dispatch, getState) => {
    todosService.query(filterBy).then((todo) => {
      const action = { type: 'SET_TODOS', todos: todo };
      dispatch(action);
    });
  };
}

// export function setFilterBy(filterBy) {
//   return (dispatch) => {
//     const action = { type: 'SET_FILTER', filterBy };
//     dispatch(action);
//   };
// }

export function addTodo(todo) {
  return async (dispatch) => {
    try {
      const savedTodo = await todosService.addTodo(todo);
      const action = {
        type: 'ADD_TODO',
        todo: savedTodo,
      };
      dispatch(action);
    } catch (err) {
      console.log('Can not add todo', todo);
    }
  };
}

export function onSaveTodo(todo) {
  return async (dispatch) => {
    try {
      const savedTodo = await todosService.saveTodo(todo);

      const action = {
        type: 'UPDATE_TODO',
        todo: savedTodo,
      };

      dispatch(action);
    } catch (err) {
      console.log('cant save todo');
    }
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
      console.log('cant remove todo', err);
    }
  };
}

// export function updateTodo(todo) {
//   return async (dispatch) => {
//     try {
//       const savedTodo = await todosService.updateTodo(todo);
//       console.log('todo from action:', todo);
//       console.log('savedTodo:', savedTodo);

//       dispatch({
//         type: 'UPDATE_TODO',
//         todo: savedTodo,
//       });
//     } catch (err) {
//       console.log('Can not update todo', err);
//     }
//   };
// }
