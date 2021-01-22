/* 액션 타입 */
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

/* 액션 생성 함수 */
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

/* increaseAsync/decreaseAsync thunk 함수 선언 - (dispatch, getState)를 parameter로 받아 특정 작업을 수행 */
export const increaseAsync = () => (dispatch) => {
    /* 1초 delay를 걸고 increase action을 dispatch 해줌 */
    setTimeout(() => dispatch(increase()), 1000);
};

export const decreaseAsync = () => (dispatch) => {
    setTimeout(() => dispatch(decrease()), 1000);
};

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
