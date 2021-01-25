import mongoose from 'mongoose';

const { Schema } = mongoose;

const PostSchema = new Schema({
    title: String,
    body: String,
    tags: [String],
    publishedDate: {
        type: Date,
        default: Date.now,
    },
    /* 포스터 작성은 로그인을 해야만 할 수 있고, 삭제/수정은 작성자 본인이여야만 할 수 있도록 schema 수정 */
    user: {
        _id: mongoose.Types.ObjectId,
        username: String,
    },
});

/* model을 생성할땐 mongoose.model 함수를 사용함
 * 이런식으로 schema를 등록하게 되면 자동으로 실제 Database에 컬렉션이 만들어 지게 됨
 * ex) Post -> posts, BookInfo -> bookinfos */
const Post = mongoose.model('Post', PostSchema); //Schema name, Schema객체
export default Post;
