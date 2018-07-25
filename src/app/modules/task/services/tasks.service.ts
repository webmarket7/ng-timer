import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SidePopupComponent } from '../../../shared-components/side-popup/side-popup.component';
import { TaskFormComponent } from '../components/task-form/task-form.component';
import { PopupService } from '../../../services/popup.service';
import { GlobalService } from '../../../services/global.service';
import { ITask } from '../../../common/interfaces';

@Injectable()
export class TasksService {

    ref: string;

    constructor(
        private popupService: PopupService,
        private globalService: GlobalService
    ) {
        this.ref = 'tasks';
    }

    openTaskPopup(patchData?: ITask) {
        const popup = this.popupService.create(SidePopupComponent);

        popup.data = {
            component: TaskFormComponent
        };

        if (patchData) {
            popup.data.patchData = patchData;
        }

        return popup.close;
    }

    getList(): Observable<{tasks: ITask[]}> {
        return this.globalService.getListObservable(this.ref);
    }

    addTask(task: ITask): PromiseLike<void> {
        return this.globalService.appendToList(this.ref, task)
            .then(
                (response) => {
                    console.log('Task is successfully added', response);

                    return response;
                },
                error => {
                    console.error('Error occured while trying to add task:', error);
                }
            );
    }

    updateTask(key: string, task: ITask): PromiseLike<void> {
        return this.globalService.updateListItem(this.ref, key, task)
            .then(
                () => {
                    console.log('Task is successfully updated');
                },
                error => {
                    console.error('Error occured while trying to update task:', error);
                }
            );
    }

    deleteTask(key: string): void {
        this.globalService.deleteFromList(this.ref, key)
            .then(
                () => {
                    console.log('Task is successfully deleted');
                },
                error => {
                    console.error('Error occured while trying to delete task:', error);
                }
            );
    }
}
