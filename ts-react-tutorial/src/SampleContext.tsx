/* TypeScript ContextAPI */
import React, { useReducer, useContext, createContext, Dispatch } from 'react';

/* 필요한 타입들을 미리 선언 */
type Color = 'red' | 'orange' | 'yellow';

// 1. 상태를 위한 타입
type State = {
    count: number;
    text: string;
    color: Color;
    isGood: boolean;
};

// 2. 모든 액션들을 위한 타입
type Action =
    | { type: 'SET_COUNT'; count: number }
    | { type: 'SET_TEXT'; text: string }
    | { type: 'SET_COLOR'; color: Color }
    | { type: 'TOGGLE_GOOD' };

/* 디스패치를 위한 타입 (Dispatch 를 리액트에서 불러올 수 있음), 액션들의 타입을 Dispatch 의 Generics로 설정 */
type SampleDispatch = Dispatch<Action>;

/* Context 만들기 */
const SampleStateContext = createContext<State | null>(null);
const SampleDispatchContext = createContext<SampleDispatch | null>(null);

/* Reducer */
function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_COUNT':
            return {
                ...state,
                count: action.count, // count가 자동완성되며, number 타입인걸 알 수 있습니다.
            };
        case 'SET_TEXT':
            return {
                ...state,
                text: action.text, // text가 자동완성되며, string 타입인걸 알 수 있습니다.
            };
        case 'SET_COLOR':
            return {
                ...state,
                color: action.color, // color 가 자동완성되며 color 가 Color 타입인걸 알 수 있습니다.
            };
        case 'TOGGLE_GOOD':
            return {
                ...state,
                isGood: !state.isGood,
            };
        default:
            throw new Error('Unhandled action');
    }
}

type SampleProviderProps = {
    children: React.ReactNode;
};

/* SampleProvider 에서 useReduer를 사용하고
 * SampleStateContext.Provider 와 SampleDispatchContext.Provider로 children을 감싸서 반환합니다. */
export function SampleProvider({ children }: SampleProviderProps) {
    const [state, dispatch] = useReducer(reducer, {
        count: 0,
        text: 'hello',
        color: 'red',
        isGood: true,
    });

    return (
        <SampleStateContext.Provider value={state}>
            <SampleDispatchContext.Provider value={dispatch}>
                {children}
            </SampleDispatchContext.Provider>
        </SampleStateContext.Provider>
    );
}

/* 커스텀 Hooks인 useSampleState 와 useSampleDispatch 에서는 null 체킹을 해주는것이 매우 중요
 * 만약 Context가 지니고 있는 값이 유효하지 않으면 에러를 발생시는 코드를 작성해주어야하는데,
 * 이를 통해 추후 Hooks 를 사용하게 될 때 각 Hooks 함수들이 반환하는 값이 언제나 유효하다는 것을 보장 할 수 있음 */

/* state 와 dispatch 를 쉽게 사용하기 위한 커스텀 Hooks */
export function useSampleState() {
    const state = useContext(SampleStateContext);
    if (!state) throw new Error('Cannot find SampleProvider'); // 유효하지 않을땐 에러를 발생
    return state;
}

export function useSampleDispatch() {
    const dispatch = useContext(SampleDispatchContext);
    if (!dispatch) throw new Error('Cannot find SampleProvider'); // 유효하지 않을땐 에러를 발생
    return dispatch;
}
