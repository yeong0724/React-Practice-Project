/* route 모듈화 */
const Router = require('koa-router');
const posts = require('./posts');
const api = new Router();

api.use('/posts', posts.routes());

/* route export */
module.exports = api;
