import { Injectable } from '@angular/core';
import { Reference } from 'angularfire2/firestore';
import { Actions, Effect } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap, tap, map, catchError } from 'rxjs/operators';
import { ITimeEntry } from '../../../common/interfaces';
import { TimeEntriesService } from '../services/time-entries.service';
import * as TimeTrackerActions from './time-tracker.actions';

@Injectable()
export class TimeTrackerEffects {

    constructor(
        private actions$: Actions,
        private timeEntriesService: TimeEntriesService
    ) {}

    @Effect()
    loadTimeEntries$ = this.actions$
        .ofType(TimeTrackerActions.LOAD)
        .pipe(
            switchMap(() => {
                return this.timeEntriesService.getList()
                    .pipe(
                        map((timeEntries: ITimeEntry[]) => {
                            return {type: TimeTrackerActions.LOAD_SUCCESS, payload: timeEntries};
                        }),
                        catchError((error) => {
                            return of({type: TimeTrackerActions.LOAD_FAILURE});
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
                            return of({type: TimeTrackerActions.LOAD_FAILURE});
                        })
                    );
            })
        );

}
