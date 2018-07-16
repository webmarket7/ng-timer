import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITimeEntry } from '../../../../common/interfaces';
import { TimeEntriesService } from '../../services/time-entries.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.reducers';
import { isLoading, timeEntries } from '../../store/time-tracker.selectors';
import * as TimeTrackerActions from '../../store/time-tracker.actions';

@Component({
    selector: 'app-time-tracker',
    templateUrl: './time-tracker.component.pug',
    styleUrls: ['./time-tracker.component.scss']
})
export class TimeTrackerComponent implements OnInit {

    tableHead: string[];
    isLoading$: Observable<boolean>;
    timeEntries$: Observable<{timeEntries: ITimeEntry[]}>;

    constructor(
        private store: Store<AppState>,
        public timeEntriesService: TimeEntriesService
    ) {
        this.tableHead = [
            'start date',
            'end date',
            'duration',
            'action'
        ];

        this.isLoading$ = store.select(isLoading);
        this.timeEntries$ = this.store.select(timeEntries);
    }

    ngOnInit() {
        this.store.dispatch(new TimeTrackerActions.LoadAction());
    }

    deleteEntry(entry: ITimeEntry) {
        this.timeEntriesService.deleteTimeEntry(entry.key);
    }
}
