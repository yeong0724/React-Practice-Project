import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { readPost, unloadPost } from '../../modules/post';
import PostViewer from '../../components/post/PostViewer';
import PostActionButtons from '../../components/post/PostActionButtons';
import { setOriginalPost } from '../../modules/write';
import { removePost } from '../../lib/api/posts';

const PostViewerContainer = ({ match, history }) => {
    /* 최초 mount 될때 readPost API 요청 */
    const { postId } = match.params;
    const dispatch = useDispatch();
    const { post, error, loading, user } = useSelector(
        ({ post, loading, user }) => ({
            post: post.post,
            error: post.error,
            loading: loading['post/READ_POST'],
            user: user.user,
        }),
    );

    /* unmount 되는 경우 UNLOAD_POST 액션 실행 */
    useEffect(() => {
        dispatch(readPost(postId));
        return () => {
            dispatch(unloadPost());
        };
    }, [dispatch, postId]);

    const onEdit = () => {
        dispatch(setOriginalPost(post));
        history.push('/write');
    };

    const ownPost = (user && user._id) === (post && post.user._id);

    const onRemove = async () => {
        try {
            await removePost(postId);
            history.push('/');
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <PostViewer
            post={post}
            loading={loading}
            error={error}
            actionButtons={
                ownPost && (
                    <PostActionButtons onEdit={onEdit} onRemove={onRemove} />
                )
            }
        />
    );
};

//URL parameter로 받아온 id값을 조회해야 하기 때문에  withRouter 사용
export default withRouter(PostViewerContainer);
