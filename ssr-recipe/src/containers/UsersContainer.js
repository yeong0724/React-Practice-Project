import React from 'react';
import Users from '../components/Users';
import { connect } from 'react-redux';
import { getUsers } from '../modules/users';
import { Preloader } from '../lib/PreloadContext';

const { useEffect } = React;

const UsersContainer = ({ users, getUsers }) => {
    /* component가 mount 되면 호출 */
    useEffect(() => {
        if (users) return; //users가 이미 유효하다면 추가적으로 요청하지않음 - 트래픽낭비 방지
        getUsers();
    }, [getUsers, users]);

    return (
        <>
            <Users users={users} />
            <Preloader resolve={getUsers} />
        </>
    );
};

export default connect(
    (state) => ({
        users: state.users.users,
    }),
    {
        getUsers,
    }
)(UsersContainer);
