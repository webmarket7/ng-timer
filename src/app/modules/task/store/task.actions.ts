import { Action } from '@ngrx/store';
import { ITask } from '../../../common/interfaces';

export enum TaskActionTypes {
    TasksRequested = '[Tasks] Tasks Requested',
    TasksLoaded = '[Tasks] Tasks Loaded',
    TaskCreated = '[Tasks] Task Created',
    TaskSelected = '[Tasks] Task Selected'
}

export class TasksRequested implements Action {
    readonly type = TaskActionTypes.TasksRequested;
}

export class TasksLoaded implements Action {
    readonly type = TaskActionTypes.TasksLoaded;

    constructor(public payload: ITask[]) {}
}

export class TaskCreated implements Action {
    readonly type = TaskActionTypes.TaskCreated;

    constructor(public payload: ITask) {}
}

export class TaskSelected implements Action {
    readonly type = TaskActionTypes.TaskSelected;

    constructor(public payload: ITask) {}
}

export type TaskActions =
    TasksRequested |
    TasksLoaded |
    TaskCreated |
    TaskSelected;
