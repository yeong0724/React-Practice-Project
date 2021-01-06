import React, { useContext } from 'react';
import { UserDispatch } from './App';

const User = React.memo(function User({ user }) {
    const { username, email, id, active } = user;

    /* userContext Hook을 사용하여 Component 내부에서 바로 조회함 */
    const dispatch = useContext(UserDispatch);

    return (
        <div>
            <button
                onClick={() =>
                    dispatch({
                        type: 'REMOVE_USER',
                        id,
                    })
                }
            >
                삭제
            </button>
            <b
                style={{ color: active ? 'green' : 'black', cursor: 'pointer' }}
                onClick={() =>
                    dispatch({
                        type: 'TOGGLE_USER',
                        id,
                    })
                }
            >
                &nbsp;{username}
            </b>{' '}
            <span>({email})</span>
        </div>
    );
});

function UserList({ users }) {
    return (
        <div>
            {users.map((user) => (
                <User user={user} key={user.id} />
            ))}
        </div>
    );
}

export default React.memo(UserList);
