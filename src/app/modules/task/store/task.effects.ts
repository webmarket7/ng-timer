import { Injectable } from '@angular/core';
import { switchMap, map, tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TaskActionTypes, TaskCreated, TasksRequested } from './task.actions';
import { ITask } from '../../../common/interfaces';
import { TasksService } from '../services/tasks.service';

@Injectable()
export class TaskEffects {

    constructor(
        private actions$: Actions,
        private tasksService: TasksService
    ) {}

    @Effect()
    loadTasks$ = this.actions$
        .pipe(
            ofType<TasksRequested>(TaskActionTypes.TasksRequested),
            switchMap(() => {

                return this.tasksService.getList()
                    .pipe(
                        map((tasks: ITask[]) => {

                            return {type: TaskActionTypes.TasksLoaded, payload: tasks};
                        })
                    );
            })
        );

    @Effect({dispatch: false})
    createTask$ = this.actions$
        .pipe(
            ofType<TaskCreated>(TaskActionTypes.TaskCreated),
            tap(action => {

                this.tasksService.addTask(action.payload);
            })
        );
}
