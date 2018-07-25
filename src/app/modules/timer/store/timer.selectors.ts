import { createSelector } from '@ngrx/store';

export const selectTimerState = state => state.timer;

export const trackButton = createSelector(
    selectTimerState,
    timer => {

        return timer.trackButtonState;
    }
);

export const trackedTask = createSelector(
    selectTimerState,
    timer => {

        return timer.trackedTask;
    }
);

export const trackedTimeEntry = createSelector(
    selectTimerState,
    timer => {

        return timer.trackedTimeEntry;
    }
);

