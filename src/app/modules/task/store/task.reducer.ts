import { TaskActions, TaskActionTypes } from './task.actions';
import { ITask } from '../../../common/interfaces';

export interface State {
    loading: boolean;
    tasks: ITask[];
    selectedTask: ITask;
}

export const initialState: State = {
    loading: false,
    tasks: [],
    selectedTask: {}
};

export function reducer(state = initialState, action: TaskActions): State {
    switch (action.type) {

        case TaskActionTypes.TasksRequested:
            return {
                ...state,
                loading: true
            };

        case TaskActionTypes.TasksLoaded:
            return {
                ...state,
                tasks: action.payload,
                loading: false
            };

        case TaskActionTypes.TaskSelected:
            return {
                ...state,
                selectedTask: action.payload
            };

        default:
            return state;
    }
}
