import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl'; //controller의 함수를 라우터에 연결해줌
import checkLoggedIn from '../../lib/checkLoggedIn';

const posts = new Router();

/* ObjectId 검증이 필요한 부분에 생성한 middleware을 추가해줌 */
posts.get('/', postsCtrl.list);
posts.post('/', checkLoggedIn, postsCtrl.write);

//const post = new Router(); // /api/posts/:id
posts.get('/:id', postsCtrl.getPostById, postsCtrl.read);
posts.delete(
    '/:id',
    checkLoggedIn,
    postsCtrl.getPostById,
    postsCtrl.checkOwnPost,
    postsCtrl.remove,
);
posts.patch(
    '/:id',
    checkLoggedIn,
    postsCtrl.getPostById,
    postsCtrl.checkOwnPost,
    postsCtrl.update,
);

//posts.use('/:id', postsCtrl.getPostById, posts.routes());

export default posts;
