import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { skipWhile, take } from 'rxjs/operators';
import { isLoggedIn } from '../modules/auth/store/auth.selectors';
import * as fromApp from '../store/app.reducers';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(
         private store: Store<fromApp.AppState>
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {

    return this.store
            .pipe(
                select(isLoggedIn),
                skipWhile((authenticated) => {
                    return authenticated === null;
                }),
                take(1)
            );
    }
}
