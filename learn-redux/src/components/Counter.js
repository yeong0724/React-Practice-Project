import React from 'react';

/* Presentational Component
 * - 리덕스 스토어에 직접적으로 접근하지 않고 필요한 값 또는 함수를 props 로만 받아와서 사용하는 컴포넌트
 * - Presentational Component는 주로 이렇게 UI를 선언하는 것에 집중하며,
 *   필요한 값들이나 함수는 props로 받아와서 사용하는 형태로 구현함
 */

function Counter({ number, diff, onIncrease, onDecrease, onSetDiff }) {
    const onChange = (e) => {
        // e.target.value 의 타입은 문자열이기 때문에 숫자로 변환해주어야 합니다.
        onSetDiff(parseInt(e.target.value, 10));
    };

    return (
        <div>
            <h1>{number}</h1>
            <div>
                <input type="number" value={diff} min="1" onChange={onChange} />
                <button onClick={onIncrease}>+</button>
                <button onClick={onDecrease}>-</button>
            </div>
        </div>
    );
}

export default Counter;
