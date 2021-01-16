import { combineReducers } from 'redux';
import counter from './counter';
import todos from './todos';

/* 현재 두가지의 리덕스 모듈을 만들었기 때문에 리듀서도 두개인 상황(counter.js / todos.js)
 * 한 프로젝트에 있는 여러개의 리듀서를 하나로 합친 경우 루트 리듀서라고 부름
 * 리듀서를 합치는 작업은 리덕스에 내장되어있는 combineReducers라는 함수를 사용한다
 */
const rootReducer = combineReducers({
    counter,
    todos,
});

export default rootReducer;
