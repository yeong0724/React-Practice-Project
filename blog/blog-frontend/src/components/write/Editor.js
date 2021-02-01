import React, { useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';

const EditorBlock = styled(Responsive)`
    /* 페이지 위 아래 여백 지정 */
    padding-top: 5rem;
    padding-bottom: 5rem;
`;
const TitleInput = styled.input`
    font-size: 3rem;
    outline: none;
    padding-bottom: 0.5rem;
    border: none;
    border-bottom: 1px solid ${palette.gray[4]};
    margin-bottom: 2rem;
    width: 100%;
`;
const QuillWrapper = styled.div`
    /* 최소 크기 지정 및 padding 제거 */
    .ql-editor {
        padding: 0;
        min-height: 320px;
        font-size: 1.125rem;
        line-height: 1.5;
    }
    .ql-editor.ql-blank::before {
        left: 0px;
    }
`;
/* useRef, useEffect를 이용한 외부 라이브러리 연동 */
const Editor = ({ title, body, onChangeField }) => {
    const quillElement = useRef(null); // Quill을 적용할 DivElement를 설정
    const quillInstance = useRef(null); // Quill 인스턴스를 설정

    useEffect(() => {
        quillInstance.current = new Quill(quillElement.current, {
            theme: 'bubble',
            placeholder: '내용을 작성하세요...',
            modules: {
                //더 많은 옵션 참조 사이드 : https://quilljs.com/docs/modules/toolbar/
                toolbar: [
                    [{ header: '1' }, { header: '2' }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['blockquote', 'code-block', 'link', 'image'],
                ],
            },
        });
        /* quill에 text-change Event-Handler 등록(참조 : https://quilljs.com/docs/api/#event) */
        const quill = quillInstance.current;
        quill.on('text-change', (delta, oldDelta, source) => {
            if (source === 'user') {
                onChangeField({ key: 'body', value: quill.root.innerHTML });
            }
        });
    }, [onChangeField]);

    /* Editor component에서 받아오는 body값은 Quill Editor에서 내용을 입력할때마다 변경되고, body가 변경될때마다 deps변수에 따라 useEffect가 호출된다
     * useRef() 함수를 이용해 UI에 mount 되고 단 한번만 useEffect에 등록된 작업이 실행되도록 설정해줌
     * -> deps 배열을 [] 비어있는 배열 처리 해줘도 같은 효과이지만 ESLint 규칙에 의해 비권장됨
     * */
    const mounted = useRef(false);
    useEffect(() => {
        if (mounted.current) return;
        mounted.current = true;
        quillInstance.current.root.innerHTML = body;
    }, [body]);

    const onChangeTitle = (e) => {
        onChangeField({ key: 'title', value: e.target.value });
    };
    return (
        <EditorBlock>
            <TitleInput
                placeholder="제목을 입력하세요"
                onChange={onChangeTitle}
                value={title}
            />
            <QuillWrapper>
                <div ref={quillElement} />
            </QuillWrapper>
        </EditorBlock>
    );
};

export default Editor;
