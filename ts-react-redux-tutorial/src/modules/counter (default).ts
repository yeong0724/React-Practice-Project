/* "as const"를 선언해줌으로써 액션 생성함수의 type에 정확한 값이 할당됨 */
const INCREASE = 'counter/INCREASE' as const;
const DECREASE = 'counter/DECREASE' as const;
const INCREASE_BY = 'counter/INCREASE_BY' as const;

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const increaseBy = (diff: number) => ({
    type: INCREASE_BY,
    payload: diff, //action의 모양새를 통일시켜 개발의 편의성을 향상 시킴
});

/* DataType 선언 */
type CounterState = {
    count: number;
};

/* ReturnType - 특정함수에서 내보내는 특정결과에 대한 type을 가져옴 */
type CounterAction =
    | ReturnType<typeof increase>
    | ReturnType<typeof decrease>
    | ReturnType<typeof increaseBy>;

/* 초기상태값 선언 */
const initialState: CounterState = {
    count: 0,
};

/* reducer 구현 */
function counter(state: CounterState = initialState, action: CounterAction): CounterState {
    switch (action.type) {
        case INCREASE:
            return { count: state.count + 1 };
        case DECREASE:
            return { count: state.count - 1 };
        case INCREASE_BY:
            return { count: state.count + action.payload };
        default:
            return state;
    }
}

export default counter;
