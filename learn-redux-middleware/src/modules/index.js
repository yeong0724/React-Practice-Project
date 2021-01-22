import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import counter, { counterSaga } from './counter';
import posts, { postsSaga } from './posts';

/* 생성한 module component를 rootReducer에 등록해줌 */
const rootReducer = combineReducers({ counter, posts });

/* saga를 하나의 root-saga로 합침 */
export function* rootSaga() {
    yield all([counterSaga(), postsSaga()]);
}

export default rootReducer;
