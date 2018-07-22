import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../tasks.service';
import { ITask } from '../../../../common/interfaces';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.pug',
    styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

    constructor(
        private tasksService: TasksService
    ) {}

    ngOnInit() {}

    openCreateTaskPopup() {
        this.tasksService.openTaskPopup()
            .subscribe((task: ITask) => {
                console.log('Task', task);
            });
    }
}
