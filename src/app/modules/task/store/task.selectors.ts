import { createSelector } from '@ngrx/store';

export const selectTaskState = state => state.task;

export const isLoading = createSelector(
    selectTaskState,
    task => {

        return task.loading;
    }
);

export const tasks = createSelector(
    selectTaskState,
    task => {

        return task.tasks;
    }
);

export const selectedTask = createSelector(
    selectTaskState,
    task => {

        return task.selectedTask;
    }
);
