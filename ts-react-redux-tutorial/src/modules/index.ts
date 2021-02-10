import { combineReducers } from 'redux';
import counter from './counter';
import todos from './todos';
import github from './github';
import { githubSaga } from './github';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
    counter,
    todos,
    github,
});

export default rootReducer;

/* redux - store에서 관리하는 상태에 대한 type 생성 */
export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
    yield all([githubSaga()]);
}
