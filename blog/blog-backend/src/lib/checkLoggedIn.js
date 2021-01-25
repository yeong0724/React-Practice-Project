/* 로그인 상태가 아니라면 401 HTTP Status를 반환하는 middleware */
const checkLoggedIn = (ctx, next) => {
    if (!ctx.state.user) {
        ctx.status = 401; //Unathorized
        return;
    }
    return next();
};

export default checkLoggedIn;
