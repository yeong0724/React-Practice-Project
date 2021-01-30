import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { readPost, unloadPost } from '../../modules/post';
import PostViewer from '../../components/post/PostViewer';

const PostViewerContainer = ({ match }) => {
    /* 최초 mount 될때 readPost API 요청 */
    const { postId } = match.params;
    const dispatch = useDispatch();
    const { post, error, loading } = useSelector(({ post, loading }) => ({
        post: post.post,
        error: post.error,
        loading: loading['post/READ_POST'],
    }));

    useEffect(() => {
        dispatch(readPost(postId));
        return () => {
            dispatch(unloadPost()); //unmount 되는 경우 UNLOAD_POST 액션 실행
        };
    }, [dispatch, postId]);

    return <PostViewer post={post} loading={loading} error={error} />;
};

//URL parameter로 받아온 id값을 조회해야 하기 때문에  withRouter 사용
export default withRouter(PostViewerContainer);
