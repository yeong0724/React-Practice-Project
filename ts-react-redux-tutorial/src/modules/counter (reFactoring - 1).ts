/* typesafe-actions를 사용하게 되면 더이상 as const를 붙여주지 않아도 됨
 * "as const"를 선언해줌으로써 액션 생성함수의 type에 정확한 값이 할당됨 */
import { ActionType, createAction, createReducer } from 'typesafe-actions';

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
const INCREASE_BY = 'counter/INCREASE_BY';

export const increase = createAction(INCREASE)();
export const decrease = createAction(DECREASE)();
export const increaseBy = createAction(INCREASE_BY, (diff: number) => ({
    count: diff,
}))<CounterState>(); //payload type 선언

const actions = { increase, decrease, increaseBy };
type CounterAction = ActionType<typeof actions>;

/* DataType 선언 */
type CounterState = {
    count: number;
};

/* 초기상태값 선언 */
const initialState: CounterState = {
    count: 0,
};

/* reducer 구현 */
const counter = createReducer<CounterState, CounterAction>(initialState, {
    [INCREASE]: (state) => ({ count: state.count + 1 }),
    [DECREASE]: (state) => ({ count: state.count - 1 }),
    [INCREASE_BY]: (state, action) => ({ count: state.count + action.payload.count }),
});

export default counter;
