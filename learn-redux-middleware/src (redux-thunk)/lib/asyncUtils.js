/* Promise에 기반한 Thunk를 만들어주는 함수 */
export const createPromiseThunk = (type, promiseCreator) => {
    /* type : 요청이 시작됐음을 알 수 있는 (GET_POSTS / GET_POST) 문자열값을 parameter로 받음
     * promiseCreator : promise를 만들어주는 함수(postsAPI.getPosts(), postsAPI.getPostById(id))를 parameter로 받음 */
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

    /* 이 함수는 promiseCreator가 단 하나의 파라미터만 받는다는 전제하에 작성되었습니다.
     * 만약 여러 종류의 파라미터를 전달해야하는 상황에서는 객체 타입의 파라미터를 받아오도록 하면 됩니다.
     * ex) writeComment({ postId: 1, text: '댓글 내용' }); */
    const thunkCreator = (param) => async (dispatch) => {
        dispatch({ type, param }); // 요청
        try {
            const payload = await promiseCreator(param);
            dispatch({ type: SUCCESS, payload }); // 성공 : data 결과물 이름을 payload 라는 이름으로 통일
        } catch (e) {
            dispatch({ type: ERROR, payload: e, error: true }); // 실패
        }
    };
    return thunkCreator;
};

const defaultIdSelector = (param) => param;

/* IdSelector - 함수타입으로써 API를 호출하는 parameter에서 id를 어떻게 선택할지 정의해주는 함수
 *            - 불필요할시에는 생략하기 위해 기본값을 설정해줌 (IdSelector 생략시 parameter 자체가 id임을 의미) */
export const createPromiseThunkById = (
    type,
    promiseCreator,
    IdSelector = defaultIdSelector
) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    const thunkCreatorById = (param) => async (dispatch) => {
        const id = IdSelector(param);
        dispatch({ type, meta: id }); // 요청
        try {
            const payload = await promiseCreator(param);
            dispatch({ type: SUCCESS, payload, meta: id }); // 성공 : data 결과물 이름을 payload 라는 이름으로 통일
        } catch (e) {
            dispatch({ type: ERROR, payload: e, error: true, meta: id }); // 실패
        }
    };
    return thunkCreatorById;
};

/* reducer에서 사용 할 수 있는 여러 유틸 함수 선언 */
export const reducerUtils = {
    // 초기 상태. 초기 data 값은 기본적으로 null 이지만 바꿀 수도 있습니다.
    initial: (initialData = null) => ({
        loading: false,
        data: initialData,
        error: null,
    }),
    // 로딩중 상태 - prevState의 경우엔 기본값은 null 이지만, 따로 값을 지정하면 null 로 바꾸지 않고 다른 값을 유지시킬 수 있습니다.
    loading: (prevState = null) => ({
        loading: true,
        data: prevState,
        error: null,
    }),
    // 성공 상태
    success: (payload) => ({
        loading: false,
        data: payload,
        error: null,
    }),
    // 실패 상태
    error: (error) => ({
        loading: false,
        data: null,
        error: error,
    }),
};

/* 비동기 관련 3가지 액션들을 처리하는 reducer
 * type - 액션의 타입,
 * key - 상태의 key (ex. posts, post) */
export const handleAsyncActions = (type, key, keepData) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    return (state, action) => {
        switch (action.type) {
            case type:
                return {
                    ...state,
                    [key]: reducerUtils.loading(
                        keepData ? state[key].data : null
                    ), //handleAsyncActions의 3번째 값을 true로 받아 온다면 기존의 상태값을 유지하겠다라는 의미(false면 null 처리)
                };
            case SUCCESS:
                return {
                    ...state,
                    [key]: reducerUtils.success(action.payload),
                };
            case ERROR:
                return {
                    ...state,
                    [key]: reducerUtils.error(action.payload),
                };
            default:
                return state;
        }
    };
};

export const handleAsyncActionsById = (type, key, keepData) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    return (state, action) => {
        const id = action.meta;
        switch (action.type) {
            case type:
                return {
                    ...state,
                    [key]: {
                        ...state[key],
                        [id]: reducerUtils.loading(
                            keepData
                                ? state[key][id] && state[key][id].data //읽어오고자 하는 state[key][id]값이 undefined면 null 처리됨
                                : null
                        ),
                    },
                };
            case SUCCESS:
                return {
                    ...state,
                    [key]: {
                        ...state[key],
                        [id]: reducerUtils.success(action.payload),
                    },
                };
            case ERROR:
                return {
                    ...state,
                    [key]: {
                        ...state[key],
                        [id]: reducerUtils.error(action.payload),
                    },
                };
            default:
                return state;
        }
    };
};
