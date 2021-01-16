import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease, setDiff } from '../modules/counter';

function CounterContainer() {
    /* useSelector는 redux store의 상태를 조회하는 Hook입니다.
     * state : redux의 현재 상태 (store.getState() 함수를 호출했을 때 나타나는 결과물과 동일함) */

    /* <useSelector의 최적화 필요성>
     * useSelector가 state를 받아서 number, diff에 비구조화 할당을 할때마다 state 객체를 새로 만들고 있기 때문에 상태가 바뀌었는지 바뀌지 않았는지 확인을 할 수 없음
     * -> 그 결과, todosContainer에만 변화가 생겨도 CounterContainer도 같이 rendering 되고 있음
    const { number, diff } = useSelector((state) => ({
        number: state.counter.number,
        diff: state.counter.diff,
    })); */

    /* 1. useSelector가 관리하는 값을 분리
     * const number = useSelector(state => state.counter.number);
     * const diff = useSelector(state => state.counter.diff); */

    /* 2. react-redux의 shallowEqual 함수 사용 */
    const { number, diff } = useSelector(
        (state) => ({
            number: state.counter.number,
            diff: state.counter.diff,
        }),
        shallowEqual
    );

    /* useDispatch 는 리덕스 스토어의 dispatch 를 함수에서 사용 할 수 있게 해주는 Hook */
    const dispatch = useDispatch();

    /* 각 액션들을 디스패치하는 함수들 - components/Counter에 있는 액션 생성 함수들 */
    const onIncrease = () => dispatch(increase());
    const onDecrease = () => dispatch(decrease());
    const onSetDiff = (diff) => dispatch(setDiff(diff));

    return (
        /* 상태와 액션을 디스패치 하는 함수들을 props로 넣어줌 */
        <Counter
            number={number}
            diff={diff}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onSetDiff={onSetDiff}
        />
    );
}

export default CounterContainer;
