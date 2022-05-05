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
      newState = { ...state, todos: state.todos.filter((todo) => todo._id !== action.todoId) };
      break;
    case 'ADD_TODO':
      newState = { ...state, todos: [...state.todos, action.todo] };

      break;
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) => (todo._id === action.todo._id ? action.todo : todo)),
      };
      break;
    case 'SET_FILTER':
      newState = { ...state, filterBy: [...action.filterBy] };
      break;
  }
  return newState;
}
