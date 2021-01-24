import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import User from '../components/User';
import { usePreloader } from '../lib/PreloadContext';
import { getUser } from '../modules/users';

const UserContainer = ({ id }) => {
    const user = useSelector((state) => state.users.user);
    const dispatch = useDispatch();

    usePreloader(() => dispatch(getUser(id))); //Server Side Rendering 할때 API 호출하기
    useEffect(() => {
        if (user && user.id === parseInt(id, 10)) return; //사용자가 존재하고, id가 일치한다면 요청하지않음
        dispatch(getUser(id));
    }, [dispatch, id, user]); //id가 바뀔때 새로 요청해야함

    /* container 유효성 검사 후 아직 정보가 없는 경우에는 user값이 null을 가리키므로, User 컴포넌트가 렌더링되지 않도록 container 컴포넌트에서 null을 반환해줘야 함
     * 하지만, 이번에는 SSR을 해야 하기 때문에 Preloader를 렌더링해 반환해줌
     * -> 서버 사이드 렌더링을 하는 과정에서 Data가 없는경우 GET_USER 액션을 발생시켜 주기 때문 */
    if (!user) {
        return null;
    }
    return <User user={user} />;
};

export default UserContainer;
