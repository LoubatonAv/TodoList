const initialState = {
  todos: [],
  filterBy: null,
};

export function todoReducer(state = initialState, action) {
  let newState = state;

  switch (action.type) {
    case 'SET_TODOS':
      newState = { ...state, todos: action.todos };
      break;
    case 'REMOVE_TODO':
      newState = { ...state, todos: state.todos.filter((todo) => todo.id !== action.todoId) };
      break;
    case 'ADD_TODO':
      newState = { ...state, todos: [...state.todos, action.todo] };

      break;
    case 'UPDATE_TODO':
      newState = {
        ...state,
        todos: state.todos.map((currTodo) => {
          return currTodo.id === action.todo.id ? action.todo : currTodo;
        }),
      };
      break;
    case 'SET_FILTER':
      newState = { ...state, filterBy: [...action.filterBy] };
      break;
  }
  return newState;
}
