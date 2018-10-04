import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { TaskCreated } from '../task/store/task.actions';
import { ITask } from '../../common/interfaces';
import { TasksService } from '../task/services/tasks.service';
import { selectedTask } from '../task/store/task.selectors';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-tracker',
    templateUrl: './tracker.component.pug',
    styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent implements OnInit {

    selectedTask$: Observable<ITask>;

    constructor(
        private store: Store<AppState>,
        private tasksService: TasksService
    ) {}

    ngOnInit() {
        this.selectedTask$ = this.store.select(selectedTask);
    }

    openCreateTaskPopup() {
        this.tasksService.openTaskPopup()
            .subscribe((task: ITask) => {
                task.logged = 0;

                this.store.dispatch(new TaskCreated(task));
            });
    }

    // openCreateTaskPopup() {
    //     this.tasksService.openCenterPopup()
    //         .subscribe((formValue) => {
    //             console.log('Form Value', formValue);
    //         });
    // }
}
