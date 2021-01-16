import React from 'react';
import qs from 'qs';

/* Query는 Route Component에게 props 전달되는 Location 객체에 있는 search 값에서 읽어올 수 있음
 * location 객체를 현재 앱이 갖고 있는 주소에 대한 정보를 아래와 같은 형태로 가지고 있음
 * location.search를 파싱하면 전달받은 parameter값을 읽을수 있음
 */
// {
//     key: 'ac3df4', // not with HashHistory!
//     pathname: '/somewhere'
//     search: '?some=search-string',
//     hash: '#howdy',
//     state: {
//       [userDefined]: true
//     }
// }

const About = ({ location }) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true, //해당 조건을 부여하지 않으면 '?'가 포험된채로 파싱이 된다.
    });
    const detail = query.detail === 'true'; // 쿼리의 파싱결과값은 문자열입니다.

    return (
        <div>
            <h1>소개</h1>
            <p>
                이 프로젝트는 리액트 라우터 기초를 실습해보는 예제
                프로젝트랍니다.
            </p>
            {detail && <p>추가적인 정보가 어쩌고 저쩌고..</p>}
        </div>
    );
};

export default About;
