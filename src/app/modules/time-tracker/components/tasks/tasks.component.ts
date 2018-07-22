import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TasksService } from '../../tasks.service';
import { TimerService } from '../../services/timer.service';
import { ITask } from '../../../../common/interfaces';
import { AppState } from '../../../../store/app.reducers';
import { isLoading, tasks } from '../../store/time-tracker.selectors';
import * as TimeTrackerActions from '../../store/time-tracker.actions';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.pug',
    styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

    tableHead: string[];
    tasks$: Observable<{tasks: ITask[]}>;
    isLoading$: Observable<boolean>;

    constructor(
        private store: Store<AppState>,
        private tasksService: TasksService,
        public timerService: TimerService
    ) {
        this.tableHead = [
            'toggle',
            'task summary',
            'logged',
            'action'
        ];

        this.isLoading$ = store.select(isLoading);
        this.tasks$ = this.store.select(tasks);
    }

    ngOnInit() {
        this.store.dispatch(new TimeTrackerActions.TasksLoadAction());
    }

    openCreateTaskPopup() {
        this.tasksService.openTaskPopup()
            .subscribe((task: ITask) => {
                task.logged = 0;

                this.store.dispatch(new TimeTrackerActions.CreatedTaskAction(task));
            });
    }

    deleteEntry(entry) {
        console.log('Entry to be deleted', entry);
    }
}
