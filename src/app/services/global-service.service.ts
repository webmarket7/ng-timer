import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ITimeEntry } from '../common/interfaces';

@Injectable({
    providedIn: 'root'
})
export class GlobalServiceService {

    url: string;

    constructor(
        private http: HttpClient
    ) {
        this.url = 'https://ng-timer.firebaseio.com/';
    }

    getEntries() {
        return this.http.get<ITimeEntry[]>(`${this.url}data.json`)
            .pipe(map((entries) => {
                    return Object.values(entries);
                }
            ));
    }

    storeEntry(entry: ITimeEntry) {
        return this.http.post(`${this.url}data.json?`, entry);
    }

    deleteEntry(entry: ITimeEntry) {
        return this.http.delete(`${this.url}data.json/${entry.id}`);
    }
}
