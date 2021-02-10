/* 회원가입 or 로그인 페이지의 Lay-out을 담당하는 Component */
import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';

const AuthTemplateBlock = styled.div`
    margin-top: 20px;
    background: ${palette.gray[2]};
    /* flex로 내부 내용 중앙 정렬 */
    display: flex;
    justify-content: center;
    align-items: center;
`;

/* 흰색 박스 */
const WhiteBox = styled.div`
    .logo-area {
        font-size: 25px;
        display: block;
        padding-bottom: 2rem;
        text-align: center;
        font-weight: bold;
        letter-spacing: 2px;
    }
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
    height: 400px;
    padding: 2rem;
    background: white;
    border-radius: 5px;
`;

const AuthTemplate = ({ children }) => {
    return (
        <AuthTemplateBlock>
            <WhiteBox>
                <div className="logo-area">
                    <Link to="/">REACTERS</Link>
                </div>
                {children}
            </WhiteBox>
        </AuthTemplateBlock>
    );
};

export default AuthTemplate;
