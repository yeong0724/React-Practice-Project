import React, { useEffect } from 'react'; // useEffect : []의 값이 비어있다면 컴포넌트가 rendering 되는 처음 그 순간에만 호출이 됨 */
import { useSelector, useDispatch } from 'react-redux';
import PostList from '../components/PostList';
import { getPosts } from '../modules/posts';

function PostListContainer() {
    /* state.posts.posts : modules/index.js - posts의 modules/posts.js - initialState의 posts를 의미 */
    const { data, loading, error } = useSelector((state) => state.posts.posts);

    /* API를 호출하기 위해서는 dispatch를 우선 가져와야함 */
    const dispatch = useDispatch();

    /* useEffect : component가 처음 rendering 될때(=Browser에 Mount될때) API 요청을 하기 위함
     * modules/posts 안에 있는 getPosts(Thunk 함수)를 dispatch 해줌 */
    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    if (loading && !data) return <div>로딩중...</div>; //받고자 하는 data가 null인 경우에만 로딩중을 띄워줌
    if (error) return <div>에러 발생!</div>;
    if (!data) return null;

    return (
        /* if문의 조건에 해당하지 않는다면 data를 유효하게 얻어온 상황 - PostList Component에 "data"를 전달 */
        <PostList posts={data} />
    );
}

export default PostListContainer;
