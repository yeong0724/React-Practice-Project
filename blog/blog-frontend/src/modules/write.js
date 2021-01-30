/* write redux module */
import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
    createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

/* 1. 모든 내용 초기화 */
const INITIALIZE = 'write/INITIALIZE';

/* 2. 특정 KEY 값 변경 */
const CHANGE_FIELD = 'write/CHANGE_FIELD';

/* 3. Post 작성 */
const [
    WRITE_POST,
    WRITE_POST_SUCCESS,
    WRITE_POST_FAILURE,
] = createRequestActionTypes('write/WRITE_POST');

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
    key,
    value,
}));
export const writePost = createAction(WRITE_POST, ({ title, body, tags }) => ({
    title,
    body,
    tags,
}));

/* saga 생성 - post작성 */
const writePostSaga = createRequestSaga(WRITE_POST, postsAPI.writePost);
export function* writeSaga() {
    yield takeLatest(WRITE_POST, writePostSaga);
}

const initialState = {
    title: '',
    body: '',
    tags: [],
    post: null,
    postError: null,
};

/* action 생성함수는 root-reducer에 등록 */
const write = handleActions(
    {
        [INITIALIZE]: (state) => initialState,
        [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
            ...state,
            [key]: value, //특정 key에 해당하는 값을 update해줌
        }),
        /* post, postError null로 초기화 */
        [WRITE_POST]: (state) => ({
            ...state,
            post: null,
            postError: null,
        }),
        /* post write success */
        [WRITE_POST_SUCCESS]: (state, { payload: post }) => ({
            ...state,
            post,
        }),
        /* post write fail */
        [WRITE_POST_FAILURE]: (state, { payload: postError }) => ({
            ...state,
            postError,
        }),
    },
    initialState,
);

export default write;
