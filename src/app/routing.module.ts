import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    {
        path: '',
        loadChildren: './modules/time-tracker/time-tracker.module#TimeTrackerModule'
    },
    {
        path: 'posts',
        loadChildren: './modules/posts/posts.module#PostsModule'
    },
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
