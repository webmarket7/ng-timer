import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ITask, ITimeEntry } from '../../../common/interfaces';
import { TimeEntriesService } from '../services/time-entries.service';
import { TasksService } from '../tasks.service';
import * as TimeTrackerActions from './time-tracker.actions';

@Injectable()
export class TimeTrackerEffects {

    constructor(
        private actions$: Actions,
        private timeEntriesService: TimeEntriesService,
        private tasksService: TasksService
    ) {}

    @Effect()
    loadTimeEntries$ = this.actions$
        .ofType(TimeTrackerActions.TE_LOAD)
        .pipe(
            switchMap(() => {
                return this.timeEntriesService.getList()
                    .pipe(
                        map((timeEntries: ITimeEntry[]) => {
                            return {type: TimeTrackerActions.TE_LOAD_SUCCESS, payload: timeEntries};
                        }),
                        catchError((error) => {
                            return of({type: TimeTrackerActions.TE_LOAD_FAILURE});
                        })
                    );
            })
        );

    @Effect()
    startTracking$ = this.actions$
        .ofType(TimeTrackerActions.STARTED_TRACKING)
        .pipe(
            switchMap((action: TimeTrackerActions.StartedTrackingAction) => {

                return from(this.timeEntriesService.addTimeEntry(action.payload))
                    .pipe(
                          map((ref: any) => {
                            return {type: TimeTrackerActions.SET_ACTIVE_TIME_ENTRY, payload: ref.key};
                        }),
                        catchError((error) => {
                            return of({type: TimeTrackerActions.TE_LOAD_FAILURE});
                        })
                    );
            })
        );

    @Effect()
    stopTracking$ = this.actions$
        .ofType(TimeTrackerActions.STOPPED_TRACKING)
        .pipe(
            switchMap((action: TimeTrackerActions.StoppedTrackingAction) => {
                const payload = action.payload;

                return from(this.timeEntriesService.updateTimeEntry(payload.key, payload.entry))
                    .pipe(
                        map((ref: any) => {
                            console.log('Stopped tracking', ref);

                            return {type: TimeTrackerActions.SET_ACTIVE_TIME_ENTRY, payload: ''};
                        }),
                        catchError((error) => {
                            return of({type: TimeTrackerActions.TE_LOAD_FAILURE});
                        })
                    );
            })
        );

    @Effect()
    loadTasks$ = this.actions$
        .ofType(TimeTrackerActions.TASKS_LOAD)
        .pipe(
            switchMap(() => {
                return this.tasksService.getList()
                    .pipe(
                        map((tasks: ITask[]) => {
                            return {type: TimeTrackerActions.TASKS_LOAD_SUCCESS, payload: tasks};
                        }),
                        catchError((error) => {
                            return of({type: TimeTrackerActions.TASKS_LOAD_FAILURE});
                        })
                    );
            })
        );


    @Effect({dispatch: false})
    createTask$ = this.actions$
        .ofType(TimeTrackerActions.CREATED_TASK)
        .pipe(
            switchMap((action: TimeTrackerActions.CreatedTaskAction) => {
                return this.tasksService.addTask(action.payload);
            })
        );

}
