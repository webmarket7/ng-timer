import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../modules/auth/store/auth.reducers';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(
        private router: Router,
        private store: Store<fromApp.AppState>
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('auth')
            .pipe(map((authState: fromAuth.State ) => {
                const isAuthenticated: boolean = authState.authenticated;

                if (!isAuthenticated) {
                    this.router.navigate(['/sign-in']);
                }

                return isAuthenticated;
            }));
    }
}
