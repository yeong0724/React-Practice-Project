import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext('defaultValue'); //기본초기값을 설정

function Child() {
    /* useContext를 사용하여 MyContext값을 각 Component에서 사용가능하게 해주는 react 내장 Hook */
    const text = useContext(MyContext);
    return <div>안녕하세요? {text}</div>;
}

function Parent() {
    return <Child />;
}

function GrandParent() {
    return <Parent />;
}

function ContextSample() {
    const [value, setValue] = useState(true);
    return (
        /* Provider를 통해 Context의 value값을 설정할수 있음 */
        <MyContext.Provider value={value ? 'Good' : 'Bad'}>
            <GrandParent />
            <button onClick={() => setValue(!value)}>Click Me</button>
        </MyContext.Provider>
    );
}

export default ContextSample;
