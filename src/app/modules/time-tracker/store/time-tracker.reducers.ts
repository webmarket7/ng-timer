import * as TimeTrackerActions from './time-tracker.actions';
import { ITimeEntry } from '../../../common/interfaces';

export interface State {
    loading: boolean;
    failed: boolean;
    timeEntries: ITimeEntry[];
    activeTimeEntry: string;
}

const initialState: State = {
    loading: false,
    failed: false,
    timeEntries: [],
    activeTimeEntry: ''
};

export function timeTrackerReducer(state: State = initialState, action: TimeTrackerActions.TimeTrackerActions) {
    switch (action.type) {

        case TimeTrackerActions.LOAD:
            return {
                ...state,
                loading: true
            };

        case TimeTrackerActions.LOAD_SUCCESS:
            return {
                ...state,
                timeEntries: action.payload,
                loading: false,
                failed: false
            };

        case TimeTrackerActions.LOAD_FAILURE:
            return {
                ...state,
                timeEntries: [],
                loading: false,
                failed: true
            };

        case TimeTrackerActions.ADD_TIME_ENTRY:
            return {
                ...state,
                timeEntries: [...state.timeEntries, action.payload]
            };

        case TimeTrackerActions.SET_ACTIVE_TIME_ENTRY: {

            return {
                ...state,
                activeTimeEntry: action.payload
            };
        }

        case TimeTrackerActions.UPDATE_TIME_ENTRY: {
            const timeEntry = state.timeEntries[action.payload.index],
                  timeEntries = [...state.timeEntries];

            timeEntries[action.payload.index] = {...timeEntry, ...action.payload.timeEntry};

            return {
                ...state,
                timeEntries: timeEntries
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
