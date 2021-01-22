import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './modules';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const customHistory = createBrowserHistory();

/* <Router + createBrowserHistory>
 * 프로젝트를 개발하다보면, thunk 함수 내에서 라우터를 사용할수 있음
 * 로그인 요청을 하는데 로그인이 성공한 경우 (pate :/)로 이동시키고, 실패 할 시 경로를 유지 하는 형태로 구현 할 수 있음.
 * thunk에서 상황별 경로 처리를 하면 코드가 훨씬 깔끔해질 수 있는 장점이 있음 */
const store = createStore(
    rootReducer,
    // 여러개의 미들웨어를 적용 할 수 있지만, logger를 사용하는 경우 logger가 가장 마지막에 와야함
    composeWithDevTools(
        applyMiddleware(
            ReduxThunk.withExtraArgument({ history: customHistory }),
            logger
        )
    )
);

ReactDOM.render(
    <Router history={customHistory}>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
