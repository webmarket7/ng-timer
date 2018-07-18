import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { ThenableReference } from 'angularfire2/database-deprecated/interfaces';
import { actionsToList } from '../common/helpers';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {

    constructor(
        private db: AngularFireDatabase
    ) {}

    getListObservable(ref: string): Observable<any> {
        return this.db.list(ref).snapshotChanges()
            .pipe(
                map(actions => {
                    return actionsToList(actions);
                }));
    }

    appendToList(ref: string, item: any): ThenableReference {
        return this.db.list(ref).push(item);
    }

    updateListItem(ref: string, key: string, item: any): Promise<void> {
        return this.db.list(ref).update(key, item);
    }

    deleteFromList(ref: string, key: string): Promise<void> {
        return this.db.list(ref).remove(key);
    }
}
