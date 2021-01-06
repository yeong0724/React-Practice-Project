import React, { useReducer, useMemo, createContext } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
import produce from 'immer';

function countActiveUsers(users) {
    console.log('활성 사용자 수를 세는중...');
    return users.filter((user) => user.active).length;
}

const initialState = {
    /* useInputs에서 관리하므로 더이상 필요없음
    inputs: {
        username: '',
        email: '',
    }, */
    users: [
        {
            id: 1,
            username: 'velopert',
            email: 'public.velopert@gmail.com',
            active: true,
        },
        {
            id: 2,
            username: 'tester',
            email: 'tester@example.com',
            active: false,
        },
        {
            id: 3,
            username: 'liz',
            email: 'liz@example.com',
            active: false,
        },
    ],
};

function reducer(state, action) {
    switch (action.type) {
        case 'CREATE_USER':
            return produce(state, (draft) => {
                draft.users.push(action.user);
            });
        // return {
        //     inputs: initialState.inputs,
        //     users: state.users.concat(action.user),
        // };
        case 'TOGGLE_USER':
            return produce(state, (draft) => {
                const user = draft.users.find((user) => user.id === action.id);
                user.active = !user.active;
            });
        // return {
        //     ...state,
        //     users: state.users.map((user) =>
        //         /* 삼항연산자 + map 함수 */
        //         user.id === action.id
        //             ? { ...user, active: !user.active }
        //             : user
        //     ),
        // };
        case 'REMOVE_USER':
            return produce(state, (draft) => {
                /* splice를 통해 배열값을 지워주려면 해당 값의 index를 알아야함 */
                const index = draft.users.findIndex(
                    (user) => user.id === action.id
                );
                draft.users.splice(index, 1);
            });
        // return {
        //     ...state,
        //     filter함수를 통해 조건에 해당하는 경우에 배열에서 걸러지게 됨
        //     users: state.users.filter((user) => user.id !== action.id),
        // };
        default:
            return state;
    }
}

export const UserDispatch = createContext(null); //초기값은 null로 설정

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { users } = state;

    const count = useMemo(() => countActiveUsers(users), [users]);
    return (
        <UserDispatch.Provider value={dispatch}>
            {/* useReducer를 통해 받은 dispatch를 넣어줌 */}
            <CreateUser />
            <UserList users={users} />
            <div>활성사용자 수 : {count}</div>
        </UserDispatch.Provider>
    );
}

export default App;
