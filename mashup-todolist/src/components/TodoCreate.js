import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md';
import { useTodoDispatch, useTodoNextId } from '../TodoContext';

const CircleButton = styled.button`
    background: #38d9a9;
    &:hover {
        background: #63e6be;
    }
    &:active {
        background: #20c997;
    }

    z-index: 5; /* 기존 Box위로 올라타야하므로 강제로 z축을 기준으로 올림 */
    cursor: pointer;
    width: 80px;
    height: 80px;
    display: block;
    align-items: center;
    justify-content: center;
    font-size: 60px;
    position: absolute;
    left: 50%;
    bottom: 0px;
    /* transform(이동) : translate -> 본 객체 가로세로 사이즈를 기준으로 이동하는 함수 */
    transform: translate(-50%, 50%);
    color: white;
    border-radius: 50%;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.125s all ease-in;

    /* CircleButton 컴포넌트가 전달받은 open props값이 true일때, false일때 */
    ${(props) =>
        props.open &&
        css`
            background: #ff6b6b;
            &:hover {
                background: #ff8787;
            }
            &:active {
                background: #fa5252;
            }
            transform: translate(-50%, 50%) rotate(45deg);
        `}
`;

const InsertFormPositioner = styled.div`
    width: 100%;
    bottom: 0;
    left: 0;
    position: absolute;
`;

const InsertForm = styled.form`
    background: #f8f9fa;
    padding-left: 32px;
    padding-top: 32px;
    padding-right: 32px;
    padding-bottom: 72px;

    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    width: 100%;
    outline: none;
    font-size: 18px;
    box-sizing: border-box;
    /* box-sizing은 박스의 크기를 화면에 표시하는 방식을 변경하는 속성으로 width와 height는 엘리먼트의 컨텐츠의 크기를 지정함
     * 따라서 테두리가 있는 경우, 테두리의 두께로 인해서 원하는 크기를 찾기가 어려움
     * box-sizing : border-box로 지정하면 테두리를 포함한 크기를 지정할 수 있기 때문에 예측하기가 쉬워짐
     * 최근엔 모든 엘리먼트에 이 값을 지정하는 경우가 늘고 있습니다. */
`;

function TodoCreate() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    const dispatch = useTodoDispatch();
    const nextId = useTodoNextId();

    const onToggle = () => setOpen(!open);
    const onChange = (e) => setValue(e.target.value);
    const onSubmit = (e) => {
        e.preventDefault(); // 새로고침 방지
        dispatch({
            type: 'CREATE',
            todo: {
                id: nextId.current,
                text: value,
                done: false,
            },
        });
        setValue('');
        setOpen(false);
        nextId.current += 1;
    };

    return (
        <>
            {open && (
                <InsertFormPositioner>
                    <InsertForm onSubmit={onSubmit}>
                        {/* 기본적으로 form Tag안에 input Tag가 유일한경우 Enter를 치게되면 자동으로 Submit하게됨   */}
                        <Input
                            autoFocus
                            placeholder="할 일을 입력 후, Enter 를 누르세요"
                            onChange={onChange}
                            value={value}
                        />
                    </InsertForm>
                </InsertFormPositioner>
            )}
            <CircleButton onClick={onToggle} open={open}>
                <MdAdd />
            </CircleButton>
        </>
    );
}

export default React.memo(TodoCreate);
