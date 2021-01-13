import React, { createContext, useReducer, useContext } from 'react';
import createAsyncDispatcher, {
    createAsyncHandler,
    initialAsyncState,
} from './asyncActionUtils';
import * as api from './api'; // api 파일에서 내보낸 모든 함수들을 불러옴

/* 외부에서 받아온 특정 Data는 여러 Component에서 사용을 해야하는 상황이 있음(ex. 로그인된 회원의 정보 처리)
 * Context에 Data를 담아서 비동기적으로 관리할 수 있음
 */

/* UsersContext 에서 사용 할 기본 상태 */
const initialState = {
    users: initialAsyncState,
    user: initialAsyncState,
};

/* 위에서 만든 객체, 유틸 함수들을 사용하여 리듀서 작성 - 총 6개의 action */
// 위에서 만든 객체 / 유틸 함수들을 사용하여 리듀서 작성
const usersHandler = createAsyncHandler('GET_USERS', 'users');
const userHandler = createAsyncHandler('GET_USER', 'user');

function usersReducer(state, action) {
    switch (action.type) {
        case 'GET_USERS':
        case 'GET_USERS_SUCCESS':
        case 'GET_USERS_ERROR':
            return usersHandler(state, action);
        case 'GET_USER':
        case 'GET_USER_SUCCESS':
        case 'GET_USER_ERROR':
            return userHandler(state, action);
        default:
            throw new Error(`Unhanded action type: ${action.type}`);
    }
}

/* State - Context 와 Dispatch - Context : 따로 분리해줘야 Component를 최적화 하는데 용이함 */
const UsersStateContext = createContext(null);
const UsersDispatchContext = createContext(null);

/* 위에서 선언한 두가지 Context들의 Provider로 감싸주는 컴포넌트 */
export function UsersProvider({ children }) {
    //action을 설정한 userReducer랑 초기설정에 해당하는 initialState 전달
    const [state, dispatch] = useReducer(usersReducer, initialState);
    return (
        <UsersStateContext.Provider value={state}>
            <UsersDispatchContext.Provider value={dispatch}>
                {children}
            </UsersDispatchContext.Provider>
        </UsersStateContext.Provider>
    );
}

/* state와 dispatch를 custom-Hook으로 export해 Component에서 사용하기 더 편해짐 */
export function useUsersState() {
    const state = useContext(UsersStateContext);
    if (!state) {
        throw new Error('Cannot find UsersProvider');
    }
    return state;
}

export function useUsersDispatch() {
    const dispatch = useContext(UsersDispatchContext);
    if (!dispatch) {
        throw new Error('Cannot find UsersProvider');
    }
    return dispatch;
}

export const getUsers = createAsyncDispatcher('GET_USERS', api.getUsers);

export const getUser = createAsyncDispatcher('GET_USER', api.getUser);
