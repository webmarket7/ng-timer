import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { TimeEntriesService } from '../services/time-entries.service';
import { ITimeEntry } from '../../../common/interfaces';
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
}
