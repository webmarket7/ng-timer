import { createSelector } from '@ngrx/store';

export const selectTimeTrackerState = state => state.timeEntry;

export const isLoading = createSelector(
    selectTimeTrackerState,
    timeEntry => {

        return timeEntry.loading;
    }
);

export const timeEntries = createSelector(
    selectTimeTrackerState,
    timeEntry => {

        return timeEntry.timeEntries;
    }
);
