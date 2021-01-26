/* useDispatch / useSelector 함수를 통해 component와 redux를 연동 */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { withRouter } from 'react-router-dom';

const RegisterForm = ({ history }) => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user,
    }));

    /* Input 변경 이벤트 핸들러 */
    const onChange = (e) => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'register',
                key: name,
                value,
            }),
        );
    };

    /* Form 등록 이벤트 핸들러 */
    const onSubmit = (e) => {
        e.preventDefault();
        const { username, password, passwordConfirm } = form;

        /* 1. 값이 하나라도 비어있는 경우 */
        if ([username, password, passwordConfirm].includes('')) {
            setError('빈칸을 모두 입력하세요');
            return;
        }

        /* 2. 비밀번호 확인이 틀린 경우 */
        if (password !== passwordConfirm) {
            setError('비밀번호가 일치하지 않습니다');
            dispatch(
                changeField({ form: 'register', key: 'password', value: '' }),
            );
            dispatch(
                changeField({
                    form: 'register',
                    key: 'passwordConfirm',
                    value: '',
                }),
            );
            return;
        }
        dispatch(register({ username, password }));
    };

    /* Component가 처음 렌더링 될 때 form 을 초기화 : 다른 페이지로부터 돌아와도 이전에 입력된 값이 남아 있는걸 방지해줌 */
    useEffect(() => {
        dispatch(initializeForm('register'));
    }, [dispatch]);

    /* 회원 가입 설공/실패 처리 - auth와 authError중 무엇이 유효한지에 따라 작업 시행*/
    useEffect(() => {
        if (authError) {
            /* 계정명이 이미 존재하는 경우 */
            if (authError.response.status === 409) {
                setError('이미 존재하는 계정명입니다');
                return;
            }
            setError('회원가입 실패'); //기타 에러
            return;
        }
        if (auth) {
            console.log('회원 가입 성공');
            console.log(auth);
            dispatch(check());
        }
    }, [auth, authError, dispatch]);

    /* user 값이 DB에 정상적으로 등록된 경우에 Home으로 이동 처리 */
    useEffect(() => {
        if (user) {
            history.push('/'); // 홈 화면으로 이동
            try {
                localStorage.setItem('user', JSON.stringify(user));
            } catch (e) {
                console.log('localStorage is not working');
            }
        }
    }, [history, user]);
    return (
        <AuthForm
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    );
};

export default withRouter(RegisterForm);
