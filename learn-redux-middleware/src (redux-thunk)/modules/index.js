import { combineReducers } from 'redux';
import counter from './counter';
import posts from './posts';

/* 생성한 module component를 rootReducer에 등록해줌 */
const rootReducer = combineReducers({ counter, posts });

export default rootReducer;
