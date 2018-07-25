import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from '../../../services/global.service';
import { ITimeEntry } from '../../../common/interfaces';

@Injectable()
export class TimeEntriesService {

    path: string;

    constructor(
        private globalService: GlobalService
    ) {
        this.path = 'time-entries';
    }

    getFragment(params?): Observable<{timeEntries: ITimeEntry[]}> {

        return this.globalService.getFragmentObservable(this.path, params);
    }

    addTimeEntry(timeEntry: ITimeEntry): PromiseLike<void> {
        return this.globalService.appendToList(this.path, timeEntry)
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
        return this.globalService.updateListItem(this.path, key, timeEntry)
            .then(
                () => {
                    console.log('Time entry is successfully updated');
                },
                error => {
                    console.error('Error occured while trying to update time entry:', error);
                }
            );
    }

    deleteTimeEntry(key: string): void {
        this.globalService.deleteFromList(this.path, key)
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
