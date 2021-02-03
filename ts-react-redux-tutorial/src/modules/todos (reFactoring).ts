import { createAction, ActionType, createReducer } from 'typesafe-actions';

const ADD_TODO = 'todos/ADD_TODO';
const TOGGLE_TODO = 'todos/TOGGLE_TODO';
const REMOVE_TODO = 'todos/REMOVE_TODO';

/* 새로운 항목을 추가 할 때 사용 할 고유 ID 값 */
let nextId = 1;

/* 상태에서 사용 할 todo data type 정의 */
export type Todo = {
    id: number;
    text: string;
    done: boolean;
};

/* Action 생성 함수 */
export const addTodo = createAction(ADD_TODO, (text: string) => ({
    id: nextId++,
    text,
}))<Todo>();

export const toggleTodo = createAction(TOGGLE_TODO)<number>();
export const removeTodo = createAction(REMOVE_TODO)<number>();

/* Action 객체들에 대한 타입 정의 */
const actions = {
    addTodo,
    toggleTodo,
    removeTodo,
};
type TodosAction = ActionType<typeof actions>;

/* 이 모듈에서 관리할 상태는 Todo 객체로 이루어진 배열 */
export type TodosState = Todo[];

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
