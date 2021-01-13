import React from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';

async function getUser({ id }) {
    const response = await axios.get(
        /* template literal 개념을 이용해 Parameter를 전달해줌 */
        `https://jsonplaceholder.typicode.com/users/${id}`
    );
    return response.data;
}

function User({ id }) {
    const { data: user, error, isLoading } = useAsync({
        promiseFn: getUser,
        id,
        watch: id,
    }); //watch : id로 설정해줌으로써 id값이 바뀔때마다 해당 함수를 호출하겠다는 의미

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!user) return null;

    return (
        <div>
            <h2>{user.username}</h2>
            <p>
                <b>Email:</b> {user.email}
            </p>
        </div>
    );
}

export default User;
