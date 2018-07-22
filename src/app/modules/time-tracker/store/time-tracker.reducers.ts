import * as TimeTrackerActions from './time-tracker.actions';
import { ITask, ITimeEntry } from '../../../common/interfaces';

export interface State {
    loading: boolean;
    failed: boolean;
    timeEntries: ITimeEntry[];
    activeTimeEntry: string;
    tasks: ITask[];
}

const initialState: State = {
    loading: false,
    failed: false,
    timeEntries: [],
    activeTimeEntry: '',
    tasks: []
};

export function timeTrackerReducer(state: State = initialState, action: TimeTrackerActions.TimeTrackerActions) {
    switch (action.type) {

        case TimeTrackerActions.TE_LOAD:
            return {
                ...state,
                loading: true
            };

        case TimeTrackerActions.TE_LOAD_SUCCESS:
            return {
                ...state,
                timeEntries: action.payload,
                loading: false,
                failed: false
            };

        case TimeTrackerActions.TE_LOAD_FAILURE:
            return {
                ...state,
                timeEntries: [],
                loading: false,
                failed: true
            };

        case TimeTrackerActions.TASKS_LOAD:
            return {
                ...state,
                loading: true
            };

        case TimeTrackerActions.TASKS_LOAD_SUCCESS:
            return {
                ...state,
                tasks: action.payload,
                loading: false,
                failed: false
            };

        case TimeTrackerActions.TASKS_LOAD_FAILURE:
            return {
                ...state,
                tasks: [],
                loading: false,
                failed: true
            };

        case TimeTrackerActions.SET_ACTIVE_TIME_ENTRY: {

            return {
                ...state,
                activeTimeEntry: action.payload
            };
        }

        case TimeTrackerActions.DELETE_TIME_ENTRY: {
            const timeEntries = [...state.timeEntries];

            timeEntries.splice(action.payload, 1);

            return {
                ...state,
                timeEntries: timeEntries
            };
        }
        default:
            return state;
    }
}
