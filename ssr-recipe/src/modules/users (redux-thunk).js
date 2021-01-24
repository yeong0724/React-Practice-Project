import axios from 'axios';

const GET_USERS_PENDING = 'users/GET_USERS_PENDING';
const GET_USERS_SUCCESS = 'users/GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'users/GET_USERS_FAILURE';

const getUsersPending = () => ({ type: GET_USERS_PENDING });
const getUsersSuccess = (payload) => ({ type: GET_USERS_SUCCESS, payload });
const getUsersFailure = (payload) => ({
    type: GET_USERS_FAILURE,
    error: true,
    payload,
});

/* thunk 함수 생성 */
export const getUsers = () => async (dispatch) => {
    try {
        dispatch(getUsersPending());
        const response = await axios.get(
            'https://jsonplaceholder.typicode.com/users'
        );
        dispatch(getUsersSuccess(response));
    } catch (e) {
        dispatch(getUsersFailure());
        throw e;
    }
};

/* 해당 module에서 관리하는 API는 한개이상으로 loading이라는 객체에 넣어줌 */
const initialState = {
    users: null,
    user: null,
    loading: {
        users: false,
        user: false,
    },
    error: {
        users: null,
        user: null,
    },
};

function users(state = initialState, action) {
    switch (action.type) {
        case GET_USERS_PENDING:
            return {
                ...state,
                loading: { ...state.loading, users: true },
            };
        case GET_USERS_SUCCESS:
            return {
                ...state,
                loading: { ...state.loading, users: false },
                users: action.payload.data,
            };
        case GET_USERS_FAILURE:
            return {
                ...state,
                loading: { ...state.loading, users: false },
                error: { ...state.error, users: action.payload },
            };
        default:
            return state;
    }
}

export default users;
