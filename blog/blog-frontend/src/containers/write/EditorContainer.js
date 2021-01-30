import React, { useEffect, useCallback } from 'react';
import Editor from '../../components/write/Editor';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initialize } from '../../modules/write';

const EditorContainer = () => {
    const dispatch = useDispatch();
    /* 1. title값과 body값을 redux-store에서 불러와 Editor Component에 전달해줌
     *  - Quill editor의 경우 input/textarea 형태가 아니기 때문에 onChange와 value값을 사용해 상태를 관리할 수 없음
     *  - 때문에 editor의 값이 바뀔때 redux-store에 값을 넣는 작업만 해주고, redux-store의 값이 바뀔 때 editor 값이 바뀌게 하는 작업은 이후에 따라 추가해줌
     *
     * 2. Editor Component에서 사용할 useEffect에서 onChangeField를 사용하므로 onChangeField 함수를 useCallback으로 감싸줌
     *  - useCallback으로 감싸주어야 나중에 Component가 화면에 나타났을때 Editor의 useEffect가 딱 한번만 실행한다
     *
     * 3. 사용자가 WritePage에서 벗어나는 경우에는 Data를 초기화 해주어야 함
     *  - Component가 unmount 될 때 useEffect로 "INITIALIZE" 액션을 발생시켜 redux의 write 관련 상태를 초기화 해줌
     *  - 초기화 작업을 해주지 않으면, page를 돌와 왔을때 이전에 입력된 내용이 그대로 있기 때문임 */
    const { title, body } = useSelector(({ write }) => ({
        title: write.title,
        body: write.body,
    }));
    const onChangeField = useCallback(
        (payload) => dispatch(changeField(payload)),
        [dispatch],
    );
    // 언마운트될 때 초기화
    useEffect(() => {
        return () => {
            dispatch(initialize());
        };
    }, [dispatch]);
    return <Editor onChangeField={onChangeField} title={title} body={body} />;
};

export default EditorContainer;
