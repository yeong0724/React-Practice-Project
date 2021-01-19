import * as postsAPI from '../api/posts'; // api/posts 안의 함수 모두 불러오기
import {
    createPromiseThunk,
    reducerUtils,
    handleAsyncActions,
} from '../lib/asyncUtils';

/* <프로미스를 다루는 리덕스 모듈을 다룰 땐 다음과 같은 사항을 고려해야함>
 * 1. 프로미스가 시작, 성공, 실패했을때 다른 액션을 디스패치해야합니다.
 * 2. 각 프로미스마다 thunk 함수를 만들어주어야 합니다.
 * 3. 리듀서에서 액션에 따라 로딩중, 결과, 에러 상태를 변경해주어야 합니다. */

/* 액션 타입 */

/* #_1 포스트 여러개 조회하기 */
const GET_POSTS = 'GET_POSTS'; // 요청 시작
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'; // 요청 성공
const GET_POSTS_ERROR = 'GET_POSTS_ERROR'; // 요청 실패

/* #_2 포스트 하나 조회하기 */
const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

/* thunk 를 사용 할 때, 꼭 모든 액션들에 대하여 액션 생성함수를 만들 필요는 없고 ,그냥 thunk 함수에서 바로 액션 객체를 만들어주어도 괜찮음 */
// thunk 생성 함수 - 리팩토링을 통한 구조 간단화
export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
export const getPost = createPromiseThunk(GET_POST, postsAPI.getPostById);
/* 3번째 인자를 사용하면 src/index.js의 withExtraArgument에서 넣어준 값들을 사용 할 수 있음 */
export const goToHome = () => (dispatch, getState, { history }) => {
    history.push('/');
};

/* posts module에서 사용 할 기본 state : 반복되는 코드를 initial() 함수를 이용해 리팩토링함 */
const initialState = {
    posts: reducerUtils.initial(),
    post: reducerUtils.initial(),
};

const getPostsReducer = handleAsyncActions(GET_POSTS, 'posts');
const getPostReducer = handleAsyncActions(GET_POST, 'post');

export default function posts(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
        case GET_POSTS_SUCCESS:
        case GET_POSTS_ERROR:
            return getPostsReducer(state, action);

        case GET_POST:
        case GET_POST_SUCCESS:
        case GET_POST_ERROR:
            return getPostReducer(state, action);

        default:
            return state;
    }
}
