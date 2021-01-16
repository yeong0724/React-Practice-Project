import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import Profile from './Profile';
import WithRouterSample from './WithRouterSample';

/* 서브 라우트 : 라우트 내부에 라우트를 만드는것을 의미함 -> 컴포넌트를 만들어서 그 안에 또 Route Component를 렌더링하면 됨
 * ex) 보통 page에 있는 tap 기능, tag 선택기능 등등을 구현할때 자주 사용됨
 */

/* NavLink 는 Link 랑 비슷한데,
 * 만약 현재 경로와 Link 에서 사용하는 경로가 일치하는 경우 특정 스타일 혹은 클래스를 적용 할 수 있는 컴포넌트 */
const Profiles = () => {
    const activeStyles = {
        background: 'black',
        color: 'white',
    };
    return (
        <div>
            <h3>유저 목록:</h3>
            <ul>
                <li>
                    <NavLink activeStyle={activeStyles} to="/profiles/velopert">
                        velopert
                    </NavLink>
                </li>
                <li>
                    <NavLink activeStyle={activeStyles} to="/profiles/gildong">
                        gildong
                    </NavLink>
                </li>
            </ul>

            {/* 기본적으로 url(/profiles)통해 profiles Component에 오게되면 render되서 보여지게되는 부분 */}
            <Route
                path="/profiles"
                exact
                render={() => <div>유저를 선택해주세요.</div>}
            />
            <Route path="/profiles/:username" component={Profile} />
            <WithRouterSample />
        </div>
    );
};

export default Profiles;
