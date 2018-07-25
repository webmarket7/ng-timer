import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService} from './services/auth-guard.service';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'tracker',
        pathMatch: 'full'
    },
    {
        path: 'tracker',
        loadChildren: './modules/timer/timer.module#TimerModule',
        canActivate: [AuthGuardService]
    },
    {
        path: 'auth',
        loadChildren: './modules/auth/auth.module#AuthModule'
    }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule {
}
