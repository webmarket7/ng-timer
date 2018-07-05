import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedComponentsModule } from '../../shared-components/shared-components.module';
import { TimerComponent } from './components/timer/timer.component';
import { TimePipe } from './pipes/time.pipe';
import { TimeTrackerComponent } from './components/time-tracker/time-tracker.component';
import { TimeEntryPipe } from './pipes/time-entry.pipe';

const routes: Routes = [
    {
        path: '',
        component: TimeTrackerComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedComponentsModule
    ],
    declarations: [
        TimerComponent,
        TimeTrackerComponent,

        TimePipe,
        TimeEntryPipe
    ],
    providers: [
        DatePipe,
        TimePipe
    ],
    entryComponents: []
})

export class TimeTrackerModule {
}
