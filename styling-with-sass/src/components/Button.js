import React from 'react';
import classNames from 'classnames';
import './Button.scss';

/* rest props 전달 */
function Button({ children, size, color, outline, fullWidth, ...rest }) {
    /* className을 size에 맞춰 유동적으로 바뀔수 있게 부여함
     * className = {['Button', size].join('')}
     * 템플릿 리터럴 방식으로도 가능함 : className = {`Button ${size}`}
     * 하지만 일일이 props를 받아올때마다 ${속성명}을 추가해주기엔 비효율적임 -> classnames라는 라이브러리를 이용해서 해결할 수 있음
     */
    console.log(rest);
    return (
        <button
            className={classNames('Button', size, color, {
                outline,
                fullWidth,
            })}
            {...rest} //props로 전달받은 rest 객체 모든것들을 button에게 설정해줌
        >
            {children}
        </button>
    );
}

Button.defaultProps = {
    size: 'medium',
    color: 'blue',
};

export default Button;
