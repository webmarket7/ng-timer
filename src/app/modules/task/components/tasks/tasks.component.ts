import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.reducers';
import { isLoading, tasks } from '../../store/task.selectors';
import { trackedTask } from '../../../timer/store/timer.selectors';
import { TasksService } from '../../services/tasks.service';
import { ITask } from '../../../../common/interfaces';
import { TaskSelected, TasksRequested } from '../../store/task.actions';
import { TimerService } from '../../../../services/timer.service';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.pug',
    styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

    tableHead: string[];
    tasks$: Observable<{tasks: ITask[]}>;
    isLoading$: Observable<boolean>;
    trackedTask$: Observable<ITask>;

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
        this.trackedTask$ = this.store.select(trackedTask);
    }

    ngOnInit() {
        this.store.dispatch(new TasksRequested());
    }

    selectTask(task: ITask) {
        this.store.dispatch(new TaskSelected(task));
    }

    deleteTask(task: ITask) {
        this.tasksService.deleteTask(task.key);
    }
}
