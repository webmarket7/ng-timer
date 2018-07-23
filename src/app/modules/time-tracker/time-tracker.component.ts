import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { TasksService } from './tasks.service';
import { ITask } from '../../common/interfaces';
import * as TimeTrackerActions from './store/time-tracker.actions';

@Component({
    selector: 'app-time-tracker',
    templateUrl: './time-tracker.component.pug',
    styleUrls: ['./time-tracker.component.scss']
})
export class TimeTrackerComponent implements OnInit {

    constructor(
        private store: Store<AppState>,
        private tasksService: TasksService,
    ) {}

    ngOnInit() {}

    openCreateTaskPopup() {
        this.tasksService.openTaskPopup()
            .subscribe((task: ITask) => {
                task.logged = 0;

                this.store.dispatch(new TimeTrackerActions.CreatedTaskAction(task));
            });
    }

}
