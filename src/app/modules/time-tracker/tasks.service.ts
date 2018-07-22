import { Injectable } from '@angular/core';
import { SidePopupComponent } from '../../shared-components/side-popup/side-popup.component';
import { TaskFormComponent } from './popups/task-form/task-form.component';
import { PopupService} from '../../services/popup.service';
import { ITask } from '../../common/interfaces';

@Injectable()
export class TasksService {

    constructor(
        private popupService: PopupService
    ) {}

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
}
