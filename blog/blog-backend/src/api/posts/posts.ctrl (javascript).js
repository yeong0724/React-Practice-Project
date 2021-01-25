/* POST 작성, 조회, 삭제 Controller
 * 임시적으로 javascript 배열을 사용하여 기능을 구현했음
 * -> 자바스크립트 배열 데이터는 시스템 메모리에 위치하기 때문에 서버를 재시작하게 되면 초기화됨*/

/* id의 초깃값 */
let postId = 1;

/* posts 배열 초기 데이터 */
const posts = [
    {
        id: 1,
        title: '제목',
        body: '내용',
    },
];

/* 포스트 작성 - POST /api/posts : { title, body } */
export const write = (ctx) => {
    // REST API의 request body는 ctx.request.body에서 조회할 수 있습니다.
    const { title, body } = ctx.request.body;
    postId += 1;
    const post = { id: postId, title, body };
    posts.push(post);
    ctx.body = post;
};

/* 포스트 목록 조회 - GET /api/posts */
export const list = (ctx) => {
    ctx.body = posts;
};

/* 특정 포스트 조회 - GET /api/posts/:id */
export const read = (ctx) => {
    const { id } = ctx.params;
    /* 주어진 id 값으로 포스트 검색
     * 파라미터로 받아 온 값은 문자열 형식이니 파라미터를 숫자로 변환하거나, 비교할 p.id 값을 문자열로 변경해야 합니다. */
    const post = posts.find((p) => p.id.toString() === id);
    if (!post) {
        ctx.status = 404;
        ctx.body = {
            message: '포스트가 존재하지 않습니다.',
        };
        return;
    }
    ctx.body = post;
};

/* 특정 포스트 제거 - DELETE /api/posts/:id */
export const remove = (ctx) => {
    const { id } = ctx.params;
    // 해당 id를 가진 post가 몇 번째인지 확인합니다.
    const index = posts.findIndex((p) => p.id.toString() === id);
    if (index === -1) {
        ctx.status = 404;
        ctx.body = {
            message: '포스트가 존재하지 않습니다.',
        };
        return;
    }
    // index번째 아이템을 제거합니다.
    posts.splice(index, 1);
    ctx.status = 204; // No Content
};

/* 포스트 수정(교체) - PUT /api/posts/:id : { title, body }
 * PUT - 전체 포스트 정보를 입력하여 데이터를 통째로 교체할 때 사용하는 메서드 */
export const replace = (ctx) => {
    const { id } = ctx.params;
    const index = posts.findIndex((p) => p.id.toString() === id); // 해당 id를 가진 post의 index
    if (index === -1) {
        ctx.status = 404;
        ctx.body = {
            message: '포스트가 존재하지 않습니다.',
        };
        return;
    }
    // 전체 객체를 덮어씌움, 따라서 id를 제외한 기존 정보를 날리고 객체를 새로 만듭니다.
    posts[index] = {
        id,
        ...ctx.request.body,
    };
    ctx.body = posts[index];
};

/* 포스트 수정(특정 필드 변경) - PATCH /api/posts/:id : { title, body }
 * PATCH - 주어진 필드만 교체하는 메서드 */
export const update = (ctx) => {
    const { id } = ctx.params;
    const index = posts.findIndex((p) => p.id.toString() === id);
    if (index === -1) {
        ctx.status = 404;
        ctx.body = {
            message: '포스트가 존재하지 않습니다.',
        };
        return;
    }
    // 기존 값에 정보를 덮어씌웁니다.
    posts[index] = {
        ...posts[index],
        ...ctx.request.body,
    };
    ctx.body = posts[index];
};
