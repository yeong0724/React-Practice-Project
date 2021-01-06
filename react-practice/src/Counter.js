import React, { Component } from 'react';

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0, // this.state를 통해 특정 객체를 설정해주면, 이 값이 Component의 상태가 됨
            fixed: 1,
            updateMe: {
                toggleMe: false,
                dontChangeMe: 1,
            },
        };
    }

    /* 클래스형 컴포넌트에서 이벤트를 등록하고자 한다면 커스텀 메서드를 만들어야 함 */
    handleIncrease = () => {
        /* console.log(this);
         * 원래는 this가 Component Instance 자기 자신을 가르켜야 하는데
         * 함수를 특정 이벤트에 연결시켜주면 함수와 this간의 연결이 사라져 버려서,
         * 함수가 실행되는 단계에서 this가 가르키는게 뭔지 모르게됨
         * [이 문제를 해결하기 위한 3가지 방법이 있음]
         * 1. Component의 생성자 함수인 constructor에서 함수를 미리 bind 해줌
         * 2. 화살표 함수 문법을 사용해 커스텀 메서드 선언
         * 3. 해당 이벤트에서 새로운 함수를 만들어 전달 - 이 방법은 이후 컴포넌트 최적화 할때 까다로워 선호되지 않는 방식
         */
        this.setState({
            counter: this.state.counter + 1,
        });
    };

    handleDecrease = () => {
        this.setState({
            counter: this.state.counter - 1,
        });
    };

    handleToggle = () => {
        this.setState({
            updateMe: {
                ...this.state.updateMe,
                toggleMe: !this.state.updateMe.toggleMe,
            }, // 기본적으로 객체의 요소값을 변경하는 경우 전개연산자를 통해 덮어씌우는 방식으로 처리해줌
        });
        console.log(this.state.updateMe.toggleMe);
    };

    render() {
        return (
            <div>
                <h1>{this.state.counter}</h1>
                <button onClick={this.handleIncrease}>+1</button>
                <button onClick={this.handleDecrease}>-1</button>
                <button onClick={this.handleToggle}>토글</button>
            </div>
        );
    }
}

/* Counter 함수형 Component */
// function reducer(state, action) {
//     switch (action.type) {
//         case 'INCREMENT':
//             return state + 1;
//         case 'DECREMENT':
//             return state - 1;
//         default:
//             return state;
//     }
// }

// function Counter() {
//     const [number, dispatch] = useReducer(reducer, 0);
//     const onIncrease = () => {
//         dispatch({ type: 'INCREMENT' });
//     };

//     const onDecrease = () => {
//         dispatch({ type: 'DECREMENT' });
//     };

//     return (
//         <div>
//             <h1>{number}</h1>
//             <button onClick={onIncrease}>+1</button>
//             <button onClick={onDecrease}>-1</button>
//         </div>
//     );
// }

export default Counter;
