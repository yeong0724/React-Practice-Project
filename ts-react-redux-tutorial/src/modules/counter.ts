/* Method Chaining 방식의 reFactoring*/
import { ActionType, createAction, createReducer } from 'typesafe-actions';

/* action 생성 함수 선언 */
export const increase = createAction('counter/INCREASE')();
export const decrease = createAction('counter/DECREASE')();
export const increaseBy = createAction('counter/INCREASE_BY')<number>();

/* redux-module에서 관리 할 상태값 type 선언 */
type CounterState = {
    count: number;
};

/* action 객체 type 정의 */
const actions = { increase, decrease, increaseBy };
type CounterAction = ActionType<typeof actions>;

/* 초기 상태값 선언 */
const initialState: CounterState = {
    count: 0,
};

/* Method-Chaining 방식의 장점은 handleAction의 첫번째 인자에 action의 type을 넣는것이 아니라 action 생성 함수 자체를 넣음
 * -> action type 선언을 생략 할 수 있음 */
const counter = createReducer<CounterState, CounterAction>(initialState)
    .handleAction(increase, (state) => ({ count: state.count + 1 }))
    .handleAction(decrease, (state) => ({ count: state.count - 1 }))
    .handleAction(increaseBy, (state, action) => ({
        count: state.count + action.payload,
    }));

export default counter;
