import React, { useState, useRef } from 'react';

function InputSample() {
    const [inputs, setInputs] = useState({
        name: '',
        nickname: '',
    });
    /* useRef를 통해 객체를 만들고, 선택하고자 하는 DOM에 ref값으로 설정해줌*/
    const nameInput = useRef();
    const { name, nickname } = inputs;
    const onChange = (e) => {
        const { name, value } = e.target;
        console.log(inputs);
        const nextInputs = {
            ...inputs,
            [name]: value,
        };
        console.log(nextInputs);
        setInputs(nextInputs);
    };

    const onReset = () => {
        setInputs({ name: '', nickname: '' });
        nameInput.current.focus();
    };

    return (
        <div>
            <input
                name="name"
                placeholder="이름"
                onChange={onChange}
                value={name}
                ref={nameInput}
            />
            <input
                name="nickname"
                placeholder="닉네임"
                onChange={onChange}
                value={nickname}
            />
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값: </b>
                {name} ({nickname})
            </div>
        </div>
    );
}

export default InputSample;
