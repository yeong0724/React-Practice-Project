const myLogger = (store) => (next) => (action) => {
    console.log(action); // 먼저 액션을 출력합니다.

    /* action이 reducer에서 모두 처리가 되기전 state를 가져와 출력함 */
    console.log('\tPrev : ', store.getState());

    const result = next(action); // 다음 미들웨어 (또는 리듀서) 에게 액션을 전달합니다.

    /* action이 reducer에서 모두 처리가 되고난 다음 state를 가져와 출력함 */
    console.log('\tNext : ', store.getState());

    return result; // result : dispatch(action)의 결과물 (기본: undefined)
};

export default myLogger;
