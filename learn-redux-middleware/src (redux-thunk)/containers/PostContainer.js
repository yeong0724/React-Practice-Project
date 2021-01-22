import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; //redux와의 연동
import { getPost, goToHome } from '../modules/posts';
import Post from '../components/Post';
import { reducerUtils } from '../lib/asyncUtils';

function PostContainer({ postId }) {
    // postId : Router parameter를 통해 받을 props 값
    const { data, loading, error } = useSelector(
        (state) => state.posts.post[postId] || reducerUtils.initial()
    ); //최초 요청이라면 state.posts.post[postId]값이 null 이므로, reducerUtils.initial()값을 비구조화 할당 해줌
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPost(postId)); // modules/posts 안에 있는 Thunk 함수(getPost())를 dispatch 해줌
    }, [postId, dispatch]);

    if (loading && !data) return <div>로딩중...</div>;
    if (error) return <div>에러 발생!</div>;
    if (!data) return null;

    return (
        <>
            <button onClick={() => dispatch(goToHome())}>Go to Home</button>
            <Post post={data} />
        </>
    );
}

export default PostContainer;
