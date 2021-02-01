/* useDispatch / useSelector 함수를 통해 component와 redux를 연동 */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initializeForm, login } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { withRouter } from 'react-router-dom';
import { check } from '../../modules/user';

const LoginForm = ({ history }) => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
        form: auth.login,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user,
    }));

    /* Input 변경 이벤트 핸들러 */
    const onChange = (e) => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'login',
                key: name,
                value,
            }),
        );
    };

    /* Form 등록 이벤트 핸들러 */
    const onSubmit = (e) => {
        e.preventDefault();
        const { username, password } = form;
        dispatch(login({ username, password }));
    };

    /* Component가 처음 렌더링 될 때 form 을 초기화 : 다른 페이지로부터 돌아와도 이전에 입력된 값이 남아 있는걸 방지해줌 */
    useEffect(() => {
        dispatch(initializeForm('login'));
    }, [dispatch]);

    useEffect(() => {
        if (authError) {
            console.log('오류 발생');
            if (authError.response.status === 600) {
                setError('아이디를 입력해주세요');
                return;
            }
            if (authError.response.status === 601) {
                setError('비밀번호를 입력해주세요');
                return;
            }
            if (authError.response.status === 602) {
                setError('존재하지않은 계정입니다');
                return;
            }
            if (authError.response.status === 603) {
                setError('비밀번호가 일치하지 않습니다');
                return;
            }
            setError('로그인 실패');
            return;
        }
        if (auth) {
            console.log('로그인 성공');
            dispatch(check());
        }
    }, [auth, authError, dispatch]);

    useEffect(() => {
        if (user) {
            history.push('/');
            try {
                localStorage.setItem('user', JSON.stringify(user));
            } catch (e) {
                console.log('localStorage is not working');
            }
        }
    }, [history, user]);

    return (
        <AuthForm
            type="login"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    );
};

export default withRouter(LoginForm);
