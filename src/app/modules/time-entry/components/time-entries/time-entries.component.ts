import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.reducers';
import { TimeEntriesService } from '../../services/time-entries.service';
import { TimeEntriesRequested } from '../../store/time-entry.actions';
import { trackedTimeEntry } from '../../../timer/store/timer.selectors';
import { selectedTask} from '../../../task/store/task.selectors';
import { isLoading, timeEntries } from '../../store/time-entry.selectors';
import { ITask, ITimeEntry } from '../../../../common/interfaces';


@Component({
    selector: 'app-time-entries',
    templateUrl: './time-entries.component.pug',
    styleUrls: ['./time-entries.component.scss']
})
export class TimeEntriesComponent implements OnInit, OnDestroy {

    tableHead: string[];
    switcher: Subscription;
    selectedTask$: Observable<ITask>;
    isLoading$: Observable<boolean>;
    timeEntries$: Observable<{timeEntries: ITimeEntry[]}>;
    trackedTimeEntry$: Observable<string>;

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

        this.selectedTask$ = this.store.select(selectedTask);
        this.isLoading$ = store.select(isLoading);
        this.timeEntries$ = this.store.select(timeEntries);
        this.trackedTimeEntry$ = this.store.select(trackedTimeEntry);
    }

    ngOnInit() {
        this.switcher = this.selectedTask$
            .subscribe((task: ITask) => {

                this.store.dispatch(new TimeEntriesRequested(task));
            });
    }

    ngOnDestroy() {
        this.switcher.unsubscribe();
    }

    deleteEntry(timeEntry: ITimeEntry) {
        this.timeEntriesService.deleteTimeEntry(timeEntry.key);
    }
}
