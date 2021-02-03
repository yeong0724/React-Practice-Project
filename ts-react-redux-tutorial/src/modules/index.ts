import { combineReducers } from 'redux';
import counter from './counter';
import todos from './todos';

const rootReducer = combineReducers({
    counter,
    todos,
});

export default rootReducer;

/* redux - store에서 관리하는 상태에 대한 type 생성 */
export type RootState = ReturnType<typeof rootReducer>;
