/* Koa 서버 띄우기
 * - Koa Application은 middleware의 배열로 구성되어 있음
 * - app.use() : middleware 함수를 application에 등록해주는 함수 */
const Koa = require('koa');
const Router = require('koa-router');

const api = require('./api');

const app = new Koa();
const router = new Router();

/* router 설정 */
router.use('/api', api.routes()); //api route 적용

/* app 인스턴스에 router 적용 */
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
    console.log('Listening to port 4000');
});
