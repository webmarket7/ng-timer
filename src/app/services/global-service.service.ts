import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ITimeEntry } from '../common/interfaces';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class GlobalServiceService {

    url: string;

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {
        this.url = 'https://ng-timer.firebaseio.com/';
    }

    getEntries() {
        const token = this.authService.getCurrentToken();

        return this.http.get<ITimeEntry[]>(`${this.url}data.json?auth=${token}`)
            .pipe(map((entries) => {
                    return Object.values(entries);
                }
            ));
    }

    storeEntry(entry: ITimeEntry) {
        const token = this.authService.getCurrentToken();

        return this.http.post(`${this.url}data.json?auth=${token}`, entry);
    }

    deleteEntry(entry: ITimeEntry) {
        const token = this.authService.getCurrentToken();

        return this.http.delete(`${this.url}data.json/${entry.id}`);
    }
}
