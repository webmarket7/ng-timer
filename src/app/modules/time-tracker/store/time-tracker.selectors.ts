import { createSelector } from '@ngrx/store';

export const selectTimeTrackerState = state => state.timeTracker;

export const timeEntries = createSelector(
    selectTimeTrackerState,
    timeTracker => {
        return timeTracker.timeEntries;
    }
);

export const isLoading = createSelector(
    selectTimeTrackerState,
    timeTracker => {
        return timeTracker.loading;
    }
);

export const isFailed = createSelector(
    selectTimeTrackerState,
    timeTracker => {
        return timeTracker.failed;
    }
);

export const activeTimeEntry = createSelector(
    selectTimeTrackerState,
    timeTracker => {
        return timeTracker.activeTimeEntry;
    }
);

export const tasks = createSelector(
    selectTimeTrackerState,
    timeTracker => {
        return timeTracker.tasks;
    }
);

