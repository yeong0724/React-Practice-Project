import { createReducer } from 'typesafe-actions';
import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from './actions';
import { TodosState, TodosAction } from './types';

/* 초기 상태값 정의 */
const initialState: TodosState = [];

/* reducer 정의 */
const todos = createReducer<TodosState, TodosAction>(initialState, {
    [ADD_TODO]: (state, action) =>
        state.concat({
            ...action.payload,
            done: false,
        }),
    [TOGGLE_TODO]: (state, { payload: id }) =>
        state.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
    [REMOVE_TODO]: (state, { payload: id }) => state.filter((todo) => todo.id !== id),
});

export default todos;
