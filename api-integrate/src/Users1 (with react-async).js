import React, { useState } from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';
import User from './User';

/* react-async Libary를 이용하여 요청 상태 관리하기 */

/* getUsers() : useAsync의 callback에 할당되는 함수
 * useAsync 에서는 Promise 의 결과를 바로 data 에 담기 때문에,
 * 요청을 한 이후 response 에서 data 추출하여 반환하는 함수를 따로 만들었습니다. */
async function getUsers() {
    const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
    );
    return response.data;
}

function Users() {
    const [userId, setUserId] = useState(null);

    const { data: users, error, isLoading, reload, run } = useAsync({
        //reload : refetch와 같은 기능
        //promiseFn: getUsers,
        //첫렌더링때는 data를 불러오지 않고 특정 함수를 통해 불러오게 하고싶다면 deferFn/run을 사용해야함
        deferFn: getUsers,
    });

    /* useAsync의 useReducer때문에 최초 Rendering 기준으로 3가지 상태값은 false 및 null임 */
    if (isLoading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!users) return <button onClick={run}>불러오기</button>;

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
            <button onClick={reload}>다시 불러오기</button>
            {userId && <User id={userId} />}
        </>
    );
}

export default Users;
