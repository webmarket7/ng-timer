import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { GlobalService } from '../../../services/global.service';
import { ITimeEntry } from '../../../common/interfaces';
import * as TimeTrackerActions from '../store/time-tracker.actions';
import * as fromApp from '../../../store/app.reducers';

@Injectable()
export class TimeEntriesService {

    ref: string;

    constructor(
        private globalService: GlobalService
    ) {
        this.ref = 'time-entries';
    }

    getList(): Observable<{timeEntries: ITimeEntry[]}> {
        return this.globalService.getListObservable(this.ref);
    }

    addTimeEntry(timeEntry: ITimeEntry): PromiseLike<void> {
        return this.globalService.appendToList(this.ref, timeEntry)
            .then(
                (response) => {
                    console.log('Time entry is successfully added', response);

                    return response;
                },
                error => {
                    console.error('Error occured while trying to add time entry:', error);
                }
            );
    }

    updateTimeEntry(key: string, timeEntry: ITimeEntry): PromiseLike<void> {
        return this.globalService.updateListItem(this.ref, key, timeEntry)
            .then(
                () => {
                    console.log('Time entry is successfully updated');
                },
                error => {
                    console.error('Error occured while trying to update time entry:', error);
                }
            );
    }

    deleteTimeEntry(key): void {
        this.globalService.deleteFromList(this.ref, key)
            .then(
                () => {
                    console.log('Time entry is successfully deleted');
                },
                error => {
                    console.error('Error occured while trying to delete time entry:', error);
                }
            );
    }
}
