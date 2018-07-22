import {Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { ITimeEntry } from '../../../../common/interfaces';
import { TimeEntriesService } from '../../services/time-entries.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.reducers';
import { isLoading, timeEntries, activeTimeEntry } from '../../store/time-tracker.selectors';
import * as TimeTrackerActions from '../../store/time-tracker.actions';

@Component({
    selector: 'app-time-entries',
    templateUrl: './time-entries.component.pug',
    styleUrls: ['./time-entries.component.scss']
})
export class TimeEntriesComponent implements OnInit {

    tableHead: string[];
    isLoading$: Observable<boolean>;
    timeEntries$: Observable<{timeEntries: ITimeEntry[]}>;
    activeTimeEntry$: Observable<string>;

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
        this.activeTimeEntry$ = this.store.select(activeTimeEntry);
    }

    ngOnInit() {
        this.store.dispatch(new TimeTrackerActions.TeLoadAction());
    }

    deleteEntry(entry: ITimeEntry) {
        this.timeEntriesService.deleteTimeEntry(entry.key);
    }
}