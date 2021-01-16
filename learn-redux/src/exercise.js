import { createStore } from 'redux';

// createStore는 스토어를 만들어주는 함수 - 리액트 프로젝트에서는 단 하나의 스토어를 만듦

/* 리덕스에서 관리 할 상태 정의 */
const initialState = {
    counter: 0,
    text: '',
    list: [],
};

/* 액션 타입 정의 - 액션 타입은 주로 대문자로 작성*/
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';
const CHANGE_TEXT = 'CHANGE_TEXT';
const ADD_TO_LIST = 'ADD_TO_LIST';

/* 액션 생성함수 정의 - 액션 생성함수는 주로 camelCase 로 작성 */
function increase() {
    return {
        type: INCREASE, // 액션 객체에는 type 값이 필수입니다.
    };
}

/* 화살표 함수로 작성하는 것이 더욱 코드가 간단하기 때문에 arrowFunction으로 작성하는게 좋음 */
const decrease = () => ({
    type: DECREASE,
});

const changeText = (text) => ({
    /* 액션안에는 type 외에 추가적인 필드를 마음대로 넣을 수 있음 */
    type: CHANGE_TEXT,
    text,
});

const addToList = (item) => ({
    type: ADD_TO_LIST,
    item,
});

/* <리듀서 만들기>
 * 위 액션 생성함수들을 통해 만들어진 객체들을 참조하여 새로운 상태를 만드는 함수를 만들어봅시다.
 * 주의 : 리듀서에서는 불변성을 꼭 지켜줘야 합니다!
 */
function reducer(state = initialState, action) {
    /* redux에서 초기상태를 만들때 reducer를 한번 호출하는데 state값이 정의되어 있지 않으면,
     * default로 반환됐을때 state는 undefind 상태이므로 state 의 초깃값을 initialState 로 지정주어야 함
     */
    switch (action.type) {
        case INCREASE:
            return {
                ...state,
                counter: state.counter + 1,
            };
        case DECREASE:
            return {
                ...state,
                counter: state.counter - 1,
            };
        case CHANGE_TEXT:
            return {
                ...state,
                text: action.text,
            };
        case ADD_TO_LIST:
            return {
                ...state,
                /* 상태의 불변성 유지 : concat */
                list: state.list.concat(action.item),
            };
        default:
            return state;
    }
}

/* 스토어 만들기 */
const store = createStore(reducer);

console.log(store.getState()); // 현재 store 안에 들어있는 상태를 조회합니다.

/* 스토어안에 들어있는 상태가 바뀔 때 마다 호출되는 listener 함수 */
const listener = () => {
    const state = store.getState();
    console.log(state);
};

/* 구독을 해제하고 싶을 때는 unsubscribe() 를 호출하면 됩니다. */
const unsubscribe = store.subscribe(listener);

/* action이 dispatch 될 때마다 상태가 바뀌게 되고, 상태가 업데이트 될 때마다 listener 함수가 호출됨 */
store.dispatch(increase());
store.dispatch(decrease());
store.dispatch(changeText('안녕하세요'));
store.dispatch(addToList({ id: 1, text: '와우' }));
