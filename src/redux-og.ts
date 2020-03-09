import { Todo } from "./type";
import { v1 as uuid } from "uuid";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

//Constants

const CREATE_TODO = "CREATE_TODO";
const EDIT_TODO = "EDIT_TODO";
const DELETE_TODO = "DELETE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const SELCTED_TODO = "SELECTED_TODO";

export type CreateTodoAction = { type: typeof CREATE_TODO; payload: Todo };

export const createTodoActionCreator = ({
  desc
}: {
  desc: string;
}): CreateTodoAction => {
  return {
    type: CREATE_TODO,
    payload: { id: uuid(), desc, isComplete: false }
  };
};

export type EditTodoAction = {
  type: typeof EDIT_TODO;
  payload: { id: string; desc: string };
};

export const editTodoActionCreator = ({
  id,
  desc
}: {
  id: string;
  desc: string;
}): EditTodoAction => {
  return { type: EDIT_TODO, payload: { id, desc } };
};

export type ToggleTodoAction = {
  type: typeof TOGGLE_TODO;
  payload: { id: string };
};

export const toggleTodoActionCreator = ({
  id
}: {
  id: string;
}): ToggleTodoAction => {
  return { type: TOGGLE_TODO, payload: { id } };
};

export type DeleteTodoAction = {
  type: typeof DELETE_TODO;
  payload: { id: string };
};

export const deleteTodoActionCreator = ({
  id
}: {
  id: string;
}): ToggleTodoAction => {
  return { type: TOGGLE_TODO, payload: { id } };
};

export type SelectedTodoAction = {
  type: typeof SELCTED_TODO;
  payload: { id: string };
};

export const selectedTodoActionCreator = ({
  id
}: {
  id: string;
}): SelectedTodoAction => {
  return { type: SELCTED_TODO, payload: { id } };
};

type TodosActionTypes =
  | CreateTodoAction
  | EditTodoAction
  | ToggleTodoAction
  | DeleteTodoAction;

function todosReducer(state: Todo[] = [], action: TodosActionTypes) {
  switch (action.type) {
    case CREATE_TODO: {
      const { payload } = action;
      return [...state, payload];
    }
    case EDIT_TODO: {
      const { payload } = action;
      return state.map(todo =>
        todo.id === payload.id ? { ...todo, desc: payload.desc } : todo
      );
    }
    case TOGGLE_TODO: {
      const { payload } = action;
      return state.map(todo =>
        todo.id === payload.id
          ? { ...todo, isComplete: !todo.isComplete }
          : todo
      );
    }
    case DELETE_TODO: {
      const { payload } = action;
      return state.filter(todo => todo.id !== payload.id);
    }
    default:
      return state;
  }
}

function selectedTodoReducer(
  state: string | null = null,
  action: SelectedTodoAction
) {
  switch (action.type) {
    case SELCTED_TODO: {
      const { payload } = action;
      return payload.id;
    }
    default:
      return state;
  }
}

function counterReducer(state: number = 0, action: TodosActionTypes) {
  switch (action.type) {
    case CREATE_TODO: {
      return state + 1;
    }
    case DELETE_TODO: {
      return state + 1;
    }
    case TOGGLE_TODO: {
      return state + 1;
    }
    case EDIT_TODO: {
      return state + 1;
    }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  todos: todosReducer,
  selectedTodoId: selectedTodoReducer,
  counter: counterReducer
});

export type State = ReturnType<typeof rootReducer>;
export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);
