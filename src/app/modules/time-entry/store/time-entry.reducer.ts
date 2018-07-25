import { TimeEntryActions, TimeEntryActionTypes } from './time-entry.actions';
import { ITimeEntry } from '../../../common/interfaces';

export interface State {
    loading: boolean;
    timeEntries: ITimeEntry[];
}

export const initialState: State = {
    loading: false,
    timeEntries: []
};

export function reducer(state = initialState, action: TimeEntryActions): State {
    switch (action.type) {

        case TimeEntryActionTypes.TimeEntriesRequested:

            return {
                ...state,
                loading: true
            };

        case TimeEntryActionTypes.TimeEntriesLoaded:

            return {
                ...state,
                timeEntries: action.payload,
                loading: false
            };

        default:
            return state;
    }
}
