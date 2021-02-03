const ADD_TODO = 'todos/ADD_TODO' as const;
const TOGGLE_TODO = 'todos/TOGGLE_TODO' as const;
const REMOVE_TODO = 'todos/REMOVE_TODO' as const;

/* 새로운 항목을 추가 할 때 사용 할 고유 ID 값 */
let nextId = 1;

/* 상태에서 사용 할 todo data type 정의 */
export type Todo = {
    id: number;
    text: string;
    done: boolean;
};

/* Action 생성 함수 */
export const addTodo = (text: string) => ({
    type: ADD_TODO,
    payload: {
        id: nextId++,
        text,
    },
});

export const toggleTodo = (id: number) => ({
    type: TOGGLE_TODO,
    payload: id,
});

export const removeTodo = (id: number) => ({
    type: REMOVE_TODO,
    payload: id,
});

/* Action 객체들에 대한 타입 정의 */
type TodosAction =
    | ReturnType<typeof addTodo>
    | ReturnType<typeof toggleTodo>
    | ReturnType<typeof removeTodo>;

/* 이 모듈에서 관리할 상태는 Todo 객체로 이루어진 배열 */
export type TodosState = Todo[];

/* 초기 상태값 정의 */
const initialState: TodosState = [];

/* reducer 정의 */
function todos(state: TodosState = initialState, action: TodosAction): TodosState {
    switch (action.type) {
        case ADD_TODO:
            return state.concat({
                // action.payload 객체 안의 값이 모두 유추됩니다.
                id: action.payload.id,
                text: action.payload.text,
                done: false,
            });
        case TOGGLE_TODO:
            return state.map((todo) =>
                // payload 가 number 인 것이 유추됩니다.
                todo.id === action.payload ? { ...todo, done: !todo.done } : todo
            );
        case REMOVE_TODO:
            /* filter 함수 : 조건에 일치하는 배열값을 제외한 배열을 반환해주는 함수 */
            return state.filter((todo) => todo.id !== action.payload);
        default:
            return state;
    }
}

export default todos;
