import React, { useState } from 'react';
import { useUsersState, useUsersDispatch, getUsers } from './UsersContext';
import User from './User';

/* <Context를 사용하는 Component>
 * useUsersState() 와 useUsersDispatch() 를 사용해서 state 와 dispatch 를 가져오고,
 * 요청을 시작 할 때에는 getUsers() 함수 안에 dispatch 를 넣어서 호출을 해줌
 */
function Users() {
    const [userId, setUserId] = useState(null);
    const state = useUsersState();
    const dispatch = useUsersDispatch();

    const { data: users, loading, error } = state.users;
    const fetchData = () => {
        getUsers(dispatch);
    };

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!users) return <button onClick={fetchData}>불러오기</button>;

    return (
        <>
            <ul>
                {users.map((user) => (
                    <li
                        key={user.id}
                        onClick={() => setUserId(user.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        {user.username} ({user.name})
                    </li>
                ))}
            </ul>
            <button onClick={fetchData}>다시 불러오기</button>
            {userId && <User id={userId} />}
        </>
    );
}

export default Users;
