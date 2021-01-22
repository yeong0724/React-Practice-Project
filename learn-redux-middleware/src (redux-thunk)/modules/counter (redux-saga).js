import { delay, put, takeEvery, takeLatest } from 'redux-saga/effects';
/* 'redux-saga/effects' 에는 다양한 유틸함수들이 들어있음.
 * put - 새로운 액션을 디스패치 할 수 있게 해주는 함수
 * takeEvery, takeLatest 액션을 모니터링하는 함수
 * 1. takeEvery : 특정 액션 타입에 대하여 디스패치되는 모든 액션들을 처리하는 함수
 * 2. takeLatest : 특정 액션 타입에 대하여 디스패치된 가장 마지막 액션만을 처리하는 함수
 * 3. takeLeading : 특정 액션 타입에 대하여 가장 먼저 디스패치된 액션만을 처리하는 함수 */

/* 액션 타입 */
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';
const INCREASE_ASYNC = 'INCREASE_ASYNC';
const DECREASE_ASYNC = 'DECREASE_ASYNC';

/* 액션 생성 함수 */
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

/* thunk로 처리했던걸 순수 객체를 만드는 함수로 대체  */
export const increaseAsync = () => ({ type: INCREASE_ASYNC });
export const decreaseAsync = () => ({ type: DECREASE_ASYNC });

// export const increaseAsync = () => (dispatch) => {
//     setTimeout(() => dispatch(increase()), 1000);
// };

/* generator 함수를 통해 redux-saga 작성 */
function* increaseSaga() {
    yield delay(1000); // 1초를 기다립니다.
    yield put(increase()); // put은 특정 액션을 디스패치 해줍니다.
}
function* decreaseSaga() {
    yield delay(1000); // 1초를 기다립니다.
    yield put(decrease()); // put은 특정 액션을 디스패치 해줍니다.
}

export function* counterSaga() {
    yield takeEvery(INCREASE_ASYNC, increaseSaga); // 모든 INCREASE_ASYNC 액션을 처리
    yield takeLatest(DECREASE_ASYNC, decreaseSaga); // 가장 마지막으로 디스패치된 DECREASE_ASYNC 액션만을 처리
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
