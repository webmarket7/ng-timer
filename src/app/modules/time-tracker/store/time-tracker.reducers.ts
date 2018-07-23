import * as TimeTrackerActions from './time-tracker.actions';
import { ITask, ITimeEntry } from '../../../common/interfaces';

export interface State {
    loading: boolean;
    failed: boolean;
    timeEntries: ITimeEntry[];
    activeTimeEntry: ITimeEntry;
    tasks: ITask[];
    selectedTask: string;
    trackedTask: ITask;
    trackButtonState: string;
}

const initialState: State = {
    loading: false,
    failed: false,
    timeEntries: [],
    activeTimeEntry: {
        key: '',
        startDate: 0,
    },
    tasks: [],
    selectedTask: '',
    trackedTask: {
        key: '',
        name: '',
        logged: 0
    },
    trackButtonState: 'stopped'
};

export function timeTrackerReducer(
    state: State = initialState,
    action: TimeTrackerActions.TimeTrackerActions
) {
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

        case TimeTrackerActions.TOGGLED_TRACK_BUTTON:
            const
                payload = action.payload,
                task = payload.task,
                buttonState = payload.buttonState.value;

            return {
                ...state,
                trackedTask: task,
                trackButtonState: buttonState
            };

        case TimeTrackerActions.SET_ACTIVE_TIME_ENTRY: {
            const timeEntry = Object.assign(state.activeTimeEntry, action.payload);

            return {
                ...state,
                activeTimeEntry: timeEntry
            };
        }

        case TimeTrackerActions.SET_START_DATE: {

            return {
                ...state,
                startDate: action.payload
            };
        }

        case TimeTrackerActions.SET_END_DATE: {

            return {
                ...state,
                endDate: action.payload
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
