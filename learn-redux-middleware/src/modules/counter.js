import { delay, put, takeEvery, takeLatest } from 'redux-saga/effects';

/* 액션 타입 */
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';
const INCREASE_ASYNC = 'INCREASE_ASYNC';
const DECREASE_ASYNC = 'DECREASE_ASYNC';

/* 액션 생성 함수 */
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

/* thunk 함수를 선언하지 않고, 순수객체를 반환해줌 */
export const increaseAsync = () => ({ type: INCREASE_ASYNC });
export const decreaseAsync = () => ({ type: DECREASE_ASYNC });

/* saga 작성
 * put() - increase 함수를 호출해서 increase 액션객체를 만들고 해당 액션을 dispatch 하도록 redux-saga middleware에게 명령하는 함수*/
function* increaseSaga() {
    yield delay(1000);
    yield put(increase());
}
function* decreaseSaga() {
    yield delay(1000);
    yield put(decrease());
}

/* saga들을 한데모아 root-saga를 만들기위해 export해줌 */
export function* counterSaga() {
    /* 이후 INCREASE_ASYNC 액션이 dispatch되면 increaseSaga의 delay() / put() 함수를 실행시킴 */
    yield takeEvery(INCREASE_ASYNC, increaseSaga);
    yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}

/* 초깃값 (상태가 객체/배열이 아니라 그냥 숫자여도 상관 없음) */
const initialState = 0;

export default function counter(state = initialState, action) {
    switch (action.type) {
        case INCREASE:
            return state + 1;
        case DECREASE:
            return state - 1;
        default:
            return state;
    }
}
