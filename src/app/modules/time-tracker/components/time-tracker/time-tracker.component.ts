import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ITimeEntry } from '../../../../common/interfaces';
import * as TimeTrackerActions from '../../store/time-tracker.actions';
import * as fromApp from '../../../../store/app.reducers';

@Component({
    selector: 'app-time-tracker',
    templateUrl: './time-tracker.component.pug',
    styleUrls: ['./time-tracker.component.scss']
})
export class TimeTrackerComponent implements OnInit {

    tableHead: string[];
    timeTrackerState: Observable<{timeEntries: ITimeEntry[]}>;

    constructor(
        private store: Store<fromApp.AppState>
    ) {
        this.tableHead = [
            'task',
            'start date',
            'end date',
            'duration',
            'action'
        ];

        this.timeTrackerState = this.store.select('timeTracker');
    }

    ngOnInit() {
    }

    deleteEntry(index: number) {
        this.store.dispatch(new TimeTrackerActions.DeleteTimeEntry(index));
    }
}
