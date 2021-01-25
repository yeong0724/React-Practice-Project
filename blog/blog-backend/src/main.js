/* Koa 서버 띄우기 */
require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import api from './api';
// import createFakeData from './createFakeData';
import jwtMiddleware from './lib/jwtMiddleware';

/* 비구조화 할당을 통해 process.env 내부 값에 대한 reference 만들기 */
const { PORT, MONGO_URI } = process.env;

mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
    .then(() => {
        console.log('Connected to MongoDB');
        //createFakeData(); 임의의 대량 DB 생성 함수
    })
    .catch((e) => {
        console.error(e);
    });

const app = new Koa();
const router = new Router();

/* router 설정 */
router.use('/api', api.routes()); //api route 적용

/* router 적용전에 body-Parser 적용 */
app.use(bodyParser());

/* router 적용전에 middleware 적용 */
app.use(jwtMiddleware);

/* app 인스턴스에 router 적용 */
app.use(router.routes()).use(router.allowedMethods());

/* PORT number를 지정하지 않았다면 4000 사용 */
const port = PORT || 4000;
app.listen(port, () => {
    console.log('Listening to port %d', port);
});
