import React from 'react';

function User({ user }) {
    /* if (!user) return null;
     * user에 대한 값을 전달받지 못했을때 null을 return하면 아무것도 redering되지 않음 (에러 발생 x)
     * 추가로, 문제가 발생되지 않은 기타 Component는 App.js에서 문제없이 rendering됨
     */
    return (
        <div>
            <div>
                <b>ID</b>: {user.id}
            </div>
            <div>
                <b>Username:</b> {user.username}
            </div>
        </div>
    );
}

export default User;
