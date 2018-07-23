import { Action } from '@ngrx/store';
import { ITask, ITimeEntry, ITimeStamp } from '../../../common/interfaces';

export const TE_LOAD = 'TE_LOAD';
export const TE_LOAD_SUCCESS = 'TE_LOAD_SUCCESS';
export const TE_LOAD_FAILURE = 'TE_LOAD_FAILURE';
export const TOGGLED_TRACK_BUTTON = 'TOGGLED_TRACK_BUTTON';
export const STARTED_TRACKING = 'STARTED_TRACKING';
export const STOPPED_TRACKING = 'STOPPED_TRACKING';
export const SET_START_DATE = 'SET_START_DATE';
export const SET_END_DATE = 'SET_END_DATE';
export const SET_ACTIVE_TIME_ENTRY = 'SET_ACTIVE_TIME_ENTRY';
export const DELETE_TIME_ENTRY = 'DELETE_TIME_ENTRY';

export const TASKS_LOAD = 'TASKS_LOAD';
export const TASKS_LOAD_SUCCESS = 'TASKS_LOAD_SUCCESS';
export const TASKS_LOAD_FAILURE = 'TASKS_LOAD_FAILURE';
export const CREATED_TASK = 'CREATED_TASK';

export class TeLoadAction implements Action {
    readonly type = TE_LOAD;
}

export class TeLoadSuccessAction implements Action {
    readonly type = TE_LOAD_SUCCESS;

    constructor(public payload: ITimeEntry[]) {}
}

export class TeLoadFailureAction implements Action {
    readonly type = TE_LOAD_FAILURE;
}

export class ToggledTrackButtonAction implements Action {
    readonly type = TOGGLED_TRACK_BUTTON;

    constructor(public payload: {
        task: ITask,
        buttonState: ITimeStamp
    }) {}
}

export class StartedTrackingAction implements Action {
    readonly type = STARTED_TRACKING;

    constructor(public payload: ITimeEntry) {}
}

export class StoppedTrackingAction implements Action {
    readonly type = STOPPED_TRACKING;

    constructor(public payload: {key: string, entry: ITimeEntry}) {}
}

export class SetActiveTimeEntry implements Action {
    readonly type = SET_ACTIVE_TIME_ENTRY;

    constructor(public payload: string) {}
}

export class SetStartDate implements Action {
    readonly type = SET_START_DATE;

    constructor(public payload: number) {}
}

export class SetEndDate implements Action {
    readonly type = SET_END_DATE;

    constructor(public payload: number) {}
}

export class DeleteTimeEntry implements Action {
    readonly type = DELETE_TIME_ENTRY;

    constructor(public payload: number) {}
}

export class TasksLoadAction implements Action {
    readonly type = TASKS_LOAD;
}

export class TasksLoadSuccessAction implements Action {
    readonly type = TASKS_LOAD_SUCCESS;

    constructor(public payload: ITask[]) {}
}

export class TasksLoadFailureAction implements Action {
    readonly type = TASKS_LOAD_FAILURE;
}

export class CreatedTaskAction implements Action {
    readonly type = CREATED_TASK;

    constructor(public payload: ITask) {}
}

export type TimeTrackerActions =
    TeLoadAction |
    TeLoadSuccessAction |
    TeLoadFailureAction |
    ToggledTrackButtonAction |
    StartedTrackingAction |
    StoppedTrackingAction |
    SetActiveTimeEntry |
    SetStartDate |
    SetEndDate |
    DeleteTimeEntry |
    TasksLoadAction |
    TasksLoadSuccessAction |
    TasksLoadFailureAction |
    CreatedTaskAction;

