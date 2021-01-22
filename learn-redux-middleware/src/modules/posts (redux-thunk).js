import * as postsAPI from '../api/posts'; // api/posts 안의 함수 모두 불러오기
import {
    createPromiseThunk,
    createPromiseThunkById,
    handleAsyncActions,
    handleAsyncActionsById,
    reducerUtils,
} from '../lib/asyncUtils';

/* <프로미스를 다루는 리덕스 모듈을 다룰 땐 다음과 같은 사항을 고려해야함>
 * 1. 프로미스가 시작, 성공, 실패했을때 다른 액션을 디스패치해야합니다.
 * 2. 각 프로미스마다 thunk 함수를 만들어주어야 합니다.
 * 3. 리듀서에서 액션에 따라 로딩중, 결과, 에러 상태를 변경해주어야 합니다. */

/* 액션 타입 - 각 api당 액션 3개씩 선언 (요청 시작/ 성공/ 실패) */

/* #_1 포스트 여러개 조회하기 */
const GET_POSTS = 'GET_POSTS';
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

/* #_2 포스트 하나 조회하기 */
const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

/* post page에서 벗어날때 기존의 post를 초기화 시켜주는 action 선언 - 다른 post를 요청할때 기존의 post값이 화면에 보여지는걸 방지할 수 있음*/
const CLEAR_POST = 'CLEAR_POST';

/* thunk 를 사용 할 때, 꼭 모든 액션들에 대하여 액션 생성함수를 만들 필요는 없고 ,그냥 thunk 함수에서 바로 액션 객체를 만들어주어도 괜찮음 */
/* thunk 생성 함수 - getPosts가 호출되고 (dispatch)를 parameter로 받아서 { } 내부 작업 실행 / asyncUtil 컴포넌트를 통해 thunk 생성 함수 모듈화
 * <동작 순서>
 * 1. 요청시작
 * 2. API 호출
 * 3. 성공했을때(try) / 실패 했을때(catch) */

/* 성능개선을 위해 state의 구조를 바꾸기 위해 getPost thunk 함수를 재선언 해줌 */
export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
export const getPost = createPromiseThunkById(GET_POST, postsAPI.getPostById);
export const clearPost = () => ({ type: CLEAR_POST });

const initialState = {
    posts: reducerUtils.initial(),
    post: {},
};

/* modules/asyncUtils 컴포넌트의 모듈화 reducer
 * 세번째 파라미터 => ture or false (asynce의 keepData 값)
 * keepData가 true라면 loading중이여도 data값을 초기화하지 않겠다라는 의미 = 기존 data를 재사용하겠다 */
const getPostsReducer = handleAsyncActions(GET_POSTS, 'posts', true);
const getPostReducer = handleAsyncActionsById(GET_POST, 'post', true);

/* Home으로 이동하는 thunk 함수 생성 */
export const goToHome = () => (dispatch, getState, { history }) => {
    history.push('/');
};

/* 해당 action들을 처리해줄 reducer 선언 - getPostsReducer / getPostReducer */
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
        case CLEAR_POST:
            return {
                ...state,
                post: reducerUtils.initial(),
            };
        default:
            return state;
    }
}
