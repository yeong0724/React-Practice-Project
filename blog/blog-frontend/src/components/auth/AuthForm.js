/* 회원가입 or 로그인 페이지 */
import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const AuthFormBlock = styled.div`
    h3 {
        margin: 0;
        color: ${palette.gray[8]};
        margin-bottom: 1rem;
    }
    text-align: center;
`;

/* Styling 된 input tag */
const StyledInput = styled.input`
    font-size: 1.5rem;
    border: none;
    border-bottom: 1px solid ${palette.gray[5]};
    padding-bottom: 0.8rem;
    outline: none;
    width: 100%;
    &:focus {
        color: $oc-teal-7;
        border-bottom: 1px solid ${palette.gray[7]};
    }
    & + & {
        margin-top: 2rem;
    }
`;

/* Form하단에 로그인 or 회원가입 Link 보여줌 */
const Footer = styled.div`
    margin-top: 2rem;
    text-align: right;
    a {
        color: ${palette.gray[6]};
        // text-decoration: underline;
        &:hover {
            color: ${palette.gray[9]};
        }
    }
`;

/* common의 Button에 추가적인 style을 부여함 */
const ButtonWithMarginTop = styled(Button)`
    margin-top: 2.5rem;
`;

const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    font-size: 2.5rem;
    margin-top: 3rem;
`;

const MenuName = styled.div`
    text-align: left;
    font-size: 2.5rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-weight: bold;
    letter-spacing: 2px;
`;

const textMap = {
    login: '로그인',
    register: '회원가입',
};

const AuthForm = ({ type, form, onChange, onSubmit, error }) => {
    const text = textMap[type];
    return (
        <AuthFormBlock>
            <MenuName>{text}</MenuName>
            <form onSubmit={onSubmit}>
                <StyledInput
                    autoComplete="username"
                    name="username"
                    placeholder="아이디"
                    onChange={onChange}
                    value={form.username}
                />
                <StyledInput
                    autoComplete="new-password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={onChange}
                    value={form.password}
                />
                {type === 'register' && (
                    <StyledInput
                        autoComplete="new-password"
                        name="passwordConfirm"
                        placeholder="Password 확인"
                        type="password"
                        onChange={onChange}
                        value={form.passwordConfirm}
                    />
                )}
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {/* true는 생략 가능 */}
                <AuthFormBlock>
                    <ButtonWithMarginTop cyan={true} fullWidth={true}>
                        {text}
                    </ButtonWithMarginTop>
                </AuthFormBlock>
            </form>
            <Footer>
                {type === 'login' ? (
                    <Link to="/register">회원가입</Link>
                ) : (
                    <Link to="/login">로그인</Link>
                )}
            </Footer>
        </AuthFormBlock>
    );
};

export default AuthForm;
