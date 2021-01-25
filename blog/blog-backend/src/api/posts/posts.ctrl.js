import Post from '../../models/post';
import mongoose from 'mongoose';
import Joi from '@hapi/joi';

const { ObjectId } = mongoose.Types;

/* 입력된 id의 Data type 확인 & 해당 id에 해당하는 Post가 있는지 검증하는 middleware */
export const getPostById = async (ctx, next) => {
    const { id } = ctx.params;
    if (!ObjectId.isValid(id)) {
        ctx.status = 400; //Bad Request
        return;
    }
    try {
        const post = await Post.findById(id);
        if (!post) {
            ctx.status = 404; //Not Found!
            return;
        }
        ctx.state.post = post;
        return next();
    } catch (e) {
        ctx.throw(500, e);
    }
};

/* id로 찾은 Post가 로그인 중인 사용자가 작성한 포스트인지 검증하는 middleware */
export const checkOwnPost = (ctx, next) => {
    const { user, post } = ctx.state;
    if (post.user._id.toString() !== user._id) {
        ctx.status = 403;
        return;
    }
    return next();
};

/* 글작성 : POST /api/posts */
// {
//     title: '제목',
//     body: '내용',
//     tags: ['태그1', '태그2']
// }
export const write = async (ctx) => {
    /* 객체가 다음 필드를 가지고 있는지 검증 - required()가 호출되면 필수항목 */
    const schema = Joi.object().keys({
        title: Joi.string().required(),
        body: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).required(),
    });

    /* 검증하고 실패인 경우에 대한 처리 */
    const result = schema.validate(ctx.request.body);
    if (result.error) {
        ctx.status = 400; //Bad request
        ctx.body = result.error;
        return;
    }

    const { title, body, tags } = ctx.request.body;
    //Post의 인스턴스를 만들 때는 new 키워드를 사용하고, 생성자 함수의 파라미터에 정보를 지닌 객체를 넣음
    const post = new Post({
        title,
        body,
        tags,
        user: ctx.state.user,
    });
    try {
        /* save() : 반환값이 promise로 async/await 문법으로 데이터베이스에 저장함 */
        await post.save();
        ctx.body = post;
    } catch (e) {
        ctx.throw(500, e);
    }
};

/* 글조회 : GET /api/posts?username=&tag=&page=
 * sort({ _id : -1}) : _id를 기준으로 내림차순 정렬
 * limit(value) : DB로 부터 value 개수 만큼만 불러옴
 * skip(value) : DB로 부터 value 개수를 만큼을 제외하고 불러옴 */
export const list = async (ctx) => {
    /* query는 문자열이기 때문에 숫자로 변환해 줘야함, 값이 주어지지 않으면 1을 기본으로 사용 */
    const page = parseInt(ctx.query.page || '1', 10);
    if (page < 1) {
        ctx.status = 400;
        return;
    }

    const { tag, username } = ctx.query;
    /* 1. url을 통해 tag, username 값이 주어진 경우 객체에 넣음
     * 2. url을 통해 tag, username 값을 받지 않은 경우 빈객체 반환 { } */
    const query = {
        ...(username ? { 'user.username': username } : {}),
        ...(tag ? { tags: tag } : {}),
    };
    try {
        const posts = await Post.find(query)
            .sort({ _id: -1 })
            .limit(10)
            .skip((page - 1) * 10)
            .exec();
        const postCount = await Post.countDocuments(query).exec();
        ctx.set('Last-Page', Math.ceil(postCount / 10));
        ctx.body = posts
            .map((post) => post.toJSON())
            .map((post) => ({
                ...post,
                body:
                    post.body.length < 200
                        ? post.body
                        : `${post.body.slice(0, 200)}...`,
            })); //body의 내용을 200자까지만 출력하고, 나머지는 "..." 처리, lean() 함수를 사용하면 곧바로 JSON형태로 data를 받아오기 떄문에 toJSON() 처리를 skip할 수 있음
    } catch (e) {
        ctx.throw(500, e);
    }
};

/* 특정 글조회 : GET /api/posts/:id */
export const read = async (ctx) => {
    ctx.body = ctx.state.post;
};

/* 글삭제 : DELETE /api/posts/:id
 * 1. remove() - 특정 조건을 만족하는 데이터를 모두 지움
 * 2. findByIdAndRemove() : 해당 Id에 해당하는 객체를 지움
 * 3. findOneAndRemove() : 특정 조건을 만족하는 데이터 하나를 찾아서 지움 */
export const remove = async (ctx) => {
    const { id } = ctx.params;
    try {
        await Post.findByIdAndRemove(id).exec();
        ctx.status = 204; //No Content : 처리는 성공했지만 응답할 Data는 없음
    } catch (e) {
        ctx.throw(500, e);
    }
};

/* 특정글 수정 : PATCH /api/posts/:id */
// {
//     title : '수정',
//     body : '수정 내용',
//     tags : ['수정', '태그']
// }
export const update = async (ctx) => {
    const { id } = ctx.params;

    /* Data Type만 검증하고, 입력여부에 대해서는 검증안함(no required()) */
    const schema = Joi.object().keys({
        title: Joi.string(),
        body: Joi.string(),
        tags: Joi.array().items(Joi.string()),
    });

    /* 검증하고 실패인 경우 에러 처리 */
    const result = schema.validate(ctx.request.body);
    if (result.error) {
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    try {
        const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
            /* new 값이 true이면 업데이트된 내용을, false이면 업데이트 전 내용을 반환함 */
            new: true,
        }).exec();
        if (!post) {
            ctx.status = 404;
            return;
        }
        ctx.body = post;
    } catch (e) {
        ctx.throw(500, e);
    }
};
