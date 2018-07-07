import * as TimeTrackerActions from './time-tracker.actions';
import { ITimeEntry } from '../../../common/interfaces';

export interface State {
    timeEntries: ITimeEntry[];
}

const initialState: State = {
    timeEntries: [
        {
            id: 1,
            task: 'Default task',
            startDate: 0,
            endDate: 0,
            duration: 0
        }
    ]
};

export function timeTrackerReducer(state = initialState, action: TimeTrackerActions.TimeTrackerActions) {
    switch (action.type) {

        case TimeTrackerActions.ADD_TIME_ENTRY:
            return {
                ...state,
                timeEntries: [...state.timeEntries, action.payload]
            };

        case TimeTrackerActions.UPDATE_TIME_ENTRY: {
            const timeEntry = state.timeEntries[action.payload.index],
                  timeEntries = [...state.timeEntries];

            timeEntries[action.payload.index] = {...timeEntry, ...action.payload.timeEntry};

            return {
                ...state,
                timeEntries: timeEntries
            };
        }

        case TimeTrackerActions.UPDATE_TIME_ENTRIES:
            return {
                timeEntries: action.payload
            };

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
