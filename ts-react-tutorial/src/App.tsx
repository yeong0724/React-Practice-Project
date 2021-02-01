import React from 'react';
import './App.css';
import Counter from './Counter';
import Greetings from './Greetings';
import MyForm from './MyForm';
import ReducerSample from './ReducerSample';
import { SampleProvider } from './SampleContext';

/* Component를 선언 할 때 이렇게 Arrow Func을 사용하여 선언해도 무방함
 * 단, 리액트 공식 문서나 해외의 유명 개발자들은 보통 function 키워드를 사용하여 함수형 컴포넌트를 선언하는 것이 대세
 * React.FC 라는 것을 사용하여 컴포넌트의 타입을 지정했는데, 이렇게 타입을 지정하는건 장/단점이 있음 */
const App: React.FC = () => {
    const onClick = (name: string) => {
        console.log(name);
    };

    const onSubmit = (form: { name: string; description: string }) => {
        console.log(form);
    };

    /* 컴포넌트의 props 를 설정하는 부에서 Ctrl + Space를 통해 확인 가능 */
    return (
        <>
            <Greetings name="REACTERS" onClick={onClick} />
            <hr />
            <Counter />
            <hr />
            <MyForm onSubmit={onSubmit} />
            <hr />
            <SampleProvider>
                <ReducerSample />
            </SampleProvider>
        </>
    );
};

export default App;
