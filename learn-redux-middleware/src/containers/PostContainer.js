import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; //redux와의 연동
import { getPost, goToHome } from '../modules/posts';
import Post from '../components/Post';

function PostContainer({ postId }) {
    // postId : Router parameter를 통해 받을 props 값
    const { data, loading, error } = useSelector((state) => state.posts.post);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPost(postId)); // modules/posts 안에 있는 getPost() Thunk 함수를 dispatch 해줌
    }, [postId, dispatch]);

    if (loading) return <div>로딩중...</div>;
    if (error) return <div>에러 발생!</div>;
    if (!data) return null;

    return (
        <>
            <button onClick={() => dispatch(goToHome())}>홈으로 이동</button>
            <Post post={data} />
        </>
    );
}

export default PostContainer;
