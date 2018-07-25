import { TimerActions, TimerActionTypes } from './timer.actions';
import { ITask, ITimeEntry } from '../../../common/interfaces';

export interface State {
    trackButtonState: string;
    trackedTask: ITask;
    trackedTimeEntry: ITimeEntry;
}

export const initialState: State = {
    trackButtonState: 'stopped',
    trackedTask: {},
    trackedTimeEntry: {}
};

export function reducer(state = initialState, action: TimerActions): State {
    switch (action.type) {

        case TimerActionTypes.TrackButtonToggled:
            const
                payload = action.payload,
                task = payload.task,
                buttonState = payload.buttonState.value;

            return {
                ...state,
                trackedTask: task,
                trackButtonState: buttonState
            };

        case TimerActionTypes.TimeEntryCreated: {

            return {
                ...state,
                trackedTimeEntry: action.payload
            };
        }

        case TimerActionTypes.TimeEntryUpdated: {
            const updatedTimeEntry = Object.assign(state.trackedTimeEntry, action.payload);

            return {
                ...state,
                trackedTimeEntry: action.payload
            };
        }

        default:
            return state;
    }
}
