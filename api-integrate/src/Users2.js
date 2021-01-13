import React, { useEffect, useReducer } from 'react';
import axios from 'axios';

/* <useReducer 로 구현했을 때의 장점>
 * 1. useState 의 setState 함수를 여러번 사용하지 않아도 됨
 * 2. reducer로 로직을 분리했으니 다른곳에서도 쉽게 재사용을 할 수 있음
 */
function reducer(state, action) {
    // 3가지 상태관리 : LOADING, SUCCESS, ERROR
    switch (action.type) {
        case 'LOADING':
            return {
                loading: true,
                data: null,
                error: null,
            };
        case 'SUCCESS':
            return {
                loading: false,
                data: action.data,
                error: null,
            };
        case 'ERROR':
            return {
                loading: false,
                data: null,
                error: action.error,
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

function Users() {
    const [state, dispatch] = useReducer(reducer, {
        /* 초기값 */
        loading: false,
        data: null,
        error: null,
    });

    /* 각 단계마다 dispatch를 통해 3가지 상태를 관리해준다 */
    const fetchUsers = async () => {
        dispatch({ type: 'LOADING' });
        try {
            const response = await axios.get(
                'https://jsonplaceholder.typicode.com/users'
            );
            dispatch({ type: 'SUCCESS', data: response.data });
        } catch (e) {
            dispatch({ type: 'ERROR', error: e });
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const { loading, data: users, error } = state; // state.data 를 users 키워드로 조회

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!users) return null;
    return (
        <>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.username} ({user.name})
                    </li>
                ))}
            </ul>
            <button onClick={fetchUsers}>다시 불러오기</button>
        </>
    );
}

export default Users;
