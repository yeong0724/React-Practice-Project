import React from 'react';
import Typical from 'react-typical';
import styled from 'styled-components';

const TypingTitle = styled.div`
    height: 0;
    position: relative;
    text-align: center;
    top: -80vh;
    z-index: 1;
    div {
        text-shadow: 0px 5px 6px rgba(255, 255, 255, 0.2);
        font-weight: 350;
        font-size: 60px;
        letter-spacing: 8px;
        text-align: center;
        color: #bdbdbd;
        .main {
            font-size: 100px;
        }
    }
`;

const TypingStyle = styled.div`
    height: 0;
    position: relative;
    text-align: center;
    top: -30vh;
    font-weight: 500;
    font-size: 50px;
    color: #bdbdbd;
    letter-spacing: 10px;
    text-shadow: 0px 5px 6px rgba(0, 0, 0, 0.7);
    z-index: 1;
`;

const Typing = () => {
    return (
        <>
            <TypingTitle>
                <div className="main">
                    <span>
                        <strong>Hello Seoul - IT ! </strong>
                    </span>
                    <br />
                    <span>
                        <strong>65th REACT</strong>
                    </span>
                </div>
            </TypingTitle>
            <TypingStyle>
                <Typical
                    steps={[
                        '',
                        2000,
                        '- JAVA -',
                        2000,
                        '- ORACLE -',
                        2000,
                        '- JavaScript -',
                        2000,
                        '- REACT -',
                        2000,
                        '- SPRING -',
                        2000,
                    ]}
                    loop={Infinity}
                    wrapper="p"
                />
            </TypingStyle>
        </>
    );
};

export default Typing;
