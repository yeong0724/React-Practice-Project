/* TagBox Component - TagItem, TagList로 나눔으로써, input값이 바뀌어도 TagList가 리렌더링 되지 않고,
                      태그 목록에 변화가 생겨도 이미 렌더링 중인 TagItem들은 리렌더링되지 않음 
 * <TagBox Component가 Rendering 되는 상황>
 *  1. input이 바뀔때
 *  2. Tag목록이 바뀔때
 */
import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const TagBoxBlock = styled.div`
  width: 100%;
  border-top: 1px solid ${palette.gray[2]};
  padding-top: 2rem;

  h4 {
    color: ${palette.gray[8]}
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
`;

const TagForm = styled.form`
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    width: 256px;
    border: 1px solid ${palette.gray[9]}; /* 스타일 초기화 */
    input,
    button {
        outline: none;
        border: none;
        font-size: 1rem;
    }

    input {
        padding: 0.5rem;
        flex: 1;
        min-width: 0;
    }
    button {
        cursor: pointer;
        padding-right: 1rem;
        padding-left: 1rem;
        border: none;
        background: ${palette.gray[8]};
        color: white;
        font-weight: bold;
        &:hover {
            background: ${palette.gray[6]};
        }
    }
`;
const Tag = styled.div`
    margin-right: 0.5rem;
    color: ${palette.gray[6]};
    cursor: pointer;
    &:hover {
        opacity: 0.5;
    }
`;

const TagListBlock = styled.div`
    display: flex;
    margin-top: 0.5rem;
`;

// React.memo를 사용하여 tag 값이 바뀔 때만 리렌더링되도록 처리
const TagItem = React.memo(({ tag, onRemove }) => (
    <Tag onClick={() => onRemove(tag)}>#{tag}</Tag>
));

// React.memo를 사용하여 tags 값이 바뀔 때만 리렌더링되도록 처리
const TagList = React.memo(({ tags, onRemove }) => (
    <TagListBlock>
        {tags.map((tag) => (
            <TagItem key={tag} tag={tag} onRemove={onRemove} />
        ))}
    </TagListBlock>
));

/* setLocalTags를 호출하는 상황에 onChangeTags도 함께 호출하고, props로 받아 온 tags가 바뀔때 setLocalTags를 호출해 줌
 * - onChangeTags 함수를 통해 TagBox component 내부에서 state가 바뀌면 redux-store에도 반영되고,
 * - useState/setLocalTags 함수를 통해 redux-store에 있는 값이 바뀌면 tagBox Component 내부의 상태도 바뀌는 SourceCode */
const TagBox = ({ tags, onChangeTags }) => {
    const [input, setInput] = useState('');
    const [localTags, setLocalTags] = useState([]);

    const insertTag = useCallback(
        (tag) => {
            if (!tag) return; // 공백이라면 추가하지 않음
            if (localTags.includes(tag)) return; // 이미 존재한다면 추가하지 않음
            const nextTags = [...localTags, tag];
            setLocalTags(nextTags);
            onChangeTags(nextTags);
        },
        [localTags, onChangeTags],
    );

    const onRemove = useCallback(
        (clickedTag) => {
            setLocalTags(localTags.filter((tag) => tag !== clickedTag));
        },
        [localTags],
    );

    const onChange = useCallback((e) => {
        setInput(e.target.value);
    }, []);

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            insertTag(input.trim()); //앞뒤 공백을 없앤 후 등록
            setInput('');
        },
        [input, insertTag],
    );

    /* tags 값이 바뀌는 경우 */
    useEffect(() => {
        setLocalTags(tags);
    }, [tags]);

    return (
        <TagBoxBlock>
            <h4>태그</h4>
            <TagForm onSubmit={onSubmit}>
                <input
                    placeholder="태그를 입력하세요"
                    value={input}
                    onChange={onChange}
                />
                <button type="submit">추가</button>
            </TagForm>

            <TagList tags={localTags} onRemove={onRemove} />
        </TagBoxBlock>
    );
};

export default TagBox;
