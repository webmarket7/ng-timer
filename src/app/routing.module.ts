import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService} from './services/auth-guard.service';

const appRoutes: Routes = [
    {
        path: '',
        loadChildren: './modules/auth/auth.module#AuthModule'
    },
    {
        path: 'time-tracker',
        loadChildren: './modules/time-tracker/time-tracker.module#TimeTrackerModule',
        canActivate: [AuthGuardService]
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
