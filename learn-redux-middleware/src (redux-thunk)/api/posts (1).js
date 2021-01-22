/* n 밀리세컨드동안 기다리는 프로미스를 만들어주는 함수
 * sleep(1000).then(() => console.log('Hello World')); */
// const sleep = (n) => new Promise((resolve) => setTimeout(resolve, n));

/* 가짜 포스트 목록 데이터 - id, title, body */
// const posts = [
//     {
//         id: 1,
//         title: '리덕스 미들웨어를 배워봅시다',
//         body: '리덕스 미들웨어를 직접 만들어보면 이해하기 쉽죠.',
//     },
//     {
//         id: 2,
//         title: 'redux-thunk를 사용해봅시다',
//         body: 'redux-thunk를 사용해서 비동기 작업을 처리해봅시다!',
//     },
//     {
//         id: 3,
//         title: 'redux-saga도 사용해봅시다',
//         body:
//             '나중엔 redux-saga를 사용해서 비동기 작업을 처리하는 방법도 배워볼 거예요.',
//     },
// ];

import axios from 'axios';

/* 포스트 목록을 가져오는 비동기 함수
 * getPosts를 호출하게 되면 하나의 promise가 만들어지게 되고 그 promise에서는 0.5초뒤에 posts를 반환해줌 */
export const getPosts = async () => {
    const response = await axios.get('/posts');
    return response.data;
};

/* ID로 포스트를 조회하는 비동기 함수 */
export const getPostById = async (id) => {
    const response = await axios.get(`/posts/${id}`);
    return response.data;
};
