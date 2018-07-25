import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { ThenableReference } from 'angularfire2/database-deprecated/interfaces';
import { actionsToList } from '../common/helpers';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {

    userId: string;

    constructor(
        private db: AngularFireDatabase,
        private auth: AngularFireAuth
    ) {
        this.auth.authState.subscribe(user => {
            if (user) {
                this.userId = user.uid;
            }
        });
    }

    getListObservable(path: string): Observable<any> {

        return this.db.list(`${path}/${this.userId}`).snapshotChanges()
            .pipe(
                map(actions => {
                    return actionsToList(actions);
                }));
    }

    getFragmentObservable(path: string, query: any): Observable<any> {

        return this.db.list(`${path}/${this.userId}`, ref => {
            return ref.orderByChild(query.orderBy). equalTo(query.equalTo);
        }).snapshotChanges()
            .pipe(
                map(actions => {
                    return actionsToList(actions);
                }));
    }

    appendToList(ref: string, item: any): ThenableReference {
        return this.db.list(`${ref}/${this.userId}`).push(item);
    }

    updateListItem(ref: string, key: string, item: any): Promise<void> {
        return this.db.list(`${ref}/${this.userId}`).update(key, item);
    }

    deleteFromList(ref: string, key: string): Promise<void> {
        return this.db.list(`${ref}/${this.userId}`).remove(key);
    }
}
