/* - 1. Post 등록 버튼 : redux-store 안에 들어 있는 값을 사용하여 new-Post를 등록함
 * - 2. Cancel 버튼 : history 객체를 사용하여 이전 page로 감
 * - 3. 성공한 경우 : server에서 응답한 post정보의 _id와 username값을 참조하여 post를 읽을수 있는 경로를 만들고, history.push()통해 설정 url 경로로 이동 */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import WriteActionButtons from '../../components/write/WriteActionButton';
import { updatePost, writePost } from '../../modules/write';

const WriteActionButtonsContainer = ({ history }) => {
    const dispatch = useDispatch();
    const { title, body, tags, post, postError, originalPostId } = useSelector(
        ({ write }) => ({
            title: write.title,
            body: write.body,
            tags: write.tags,
            post: write.post,
            postError: write.postError,
            originalPostId: write.originalPostId,
        }),
    );

    /* post 등록  */
    const onPublish = () => {
        if (originalPostId) {
            dispatch(updatePost({ title, body, tags, id: originalPostId }));
            return;
        }
        dispatch(
            writePost({
                title,
                body,
                tags,
            }),
        );
    };

    /* 작성 취소 */
    const onCancel = () => {
        history.goBack();
    };

    /* post 등록 성공 및 실패 */
    useEffect(() => {
        if (post) {
            const { _id, user } = post;
            history.push(`/@${user.username}/${_id}`);
        }
        if (postError) {
            console.log(postError);
        }
    }, [history, post, postError]);

    return (
        <WriteActionButtons
            onPublish={onPublish}
            onCancel={onCancel}
            isEdit={!!originalPostId}
        />
    );
};

export default withRouter(WriteActionButtonsContainer);
