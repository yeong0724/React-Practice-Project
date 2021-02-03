import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type TodosAction = ActionType<typeof actions>;

/* 상태에서 사용 할 todo data type 정의 */
export type Todo = {
    id: number;
    text: string;
    done: boolean;
};

export type TodosState = Todo[];
