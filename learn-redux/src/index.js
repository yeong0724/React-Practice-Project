import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './modules';
import { composeWithDevTools } from 'redux-devtools-extension'; // 리덕스 개발자 도구

/* 스토어 생성 - composeWithDevTools 를 사용하여 리덕스 개발자 도구 활성화 */
const store = createStore(rootReducer, composeWithDevTools());
console.log(store.getState());

/* react-redux에서 Provider라는 컴포넌트를 불러와서 App 컴포넌트를 감싼뒤 Provider의 props에 store 를 넣어줌
 * Provider로 store를 넣어서 App을 감싸게 되면 우리가 렌더링하는 모든 컴포넌트에서 redux store에 접근 할 수 있게 됨 */

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
