import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import About from './About';
import Home from './Home';
import Profiles from './Profiles';
import HistorySample from './HistorySample';

/* Route : 특정 주소에 특정 컴포넌트가 나타나게 해주는 역할을 수행하는 컴포넌트
 * Link : 클릭시 다른 주소로 이동시켜주는 컴포넌트
 *       (a 태그의 기본적인 속성은 페이지를 이동시키면서 페이지를 아예 새로 Loading 하기 때문에 사용할 수 없음 )
 */

const App = () => {
    return (
        <div>
            {/* 경로 - 컴포넌트 지정, exact라는 props를 선언하게 되면 URL path가 정확하게 일치해야만 해당 컴포넌트가 출력됨*/}
            <ul>
                <li>
                    <Link to="/">홈</Link>
                </li>
                <li>
                    <Link to="/about">소개</Link>
                </li>
                <li>
                    <Link to="/profiles">프로필 목록</Link>
                </li>
                <li>
                    <Link to="/history">예제</Link>
                </li>
            </ul>
            <hr />
            {/* Switch 컴포넌트를 사용하게되면 규칙이 일치하는 라우트 단 하나만을 렌더링시켜줌 */}
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about" component={About} />
                <Route path="/profiles" component={Profiles} />
                <Route path="/history" component={HistorySample} />
                <Route
                    // path 를 따로 정의하지 않으면 모든 상황에 렌더링됨
                    render={({ location }) => (
                        <div>
                            <h2>이 페이지는 존재하지 않습니다</h2>
                            <p>URL path : {location.pathname}</p>
                        </div>
                    )}
                />
                {/* 동적으로 path를 선언해주고 url을 통해 username값을 지정해줌
                 * <Route path="/profiles/:username" component={Profile} /> */}
            </Switch>
        </div>
    );
};

export default App;
