import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TimeEntriesService } from '../services/time-entries.service';
import { TimeEntriesRequested, TimeEntryActionTypes } from './time-entry.actions';
import { ITimeEntry } from '../../../common/interfaces';

@Injectable()
export class TimeEntryEffects {

    constructor(
        private actions$: Actions,
        private timeEntriesService: TimeEntriesService
    ) {}

    @Effect()
    loadTimeEntries$ = this.actions$
        .pipe(
            ofType<TimeEntriesRequested>(TimeEntryActionTypes.TimeEntriesRequested),
            switchMap(action => {

                return this.timeEntriesService.getFragment({
                    orderBy: 'taskKey',
                    equalTo: action.payload.key
                })
                    .pipe(
                        map((timeEntries: ITimeEntry[]) => {
                            return {type: TimeEntryActionTypes.TimeEntriesLoaded, payload: timeEntries};
                        })
                    );
            })
        );
}
