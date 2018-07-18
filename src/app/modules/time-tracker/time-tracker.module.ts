import { NgModule } from '@angular/core';
import { CommonModule, DatePipe} from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedComponentsModule } from '../../shared-components/shared-components.module';
import { TimerComponent } from './components/timer/timer.component';
import { TimePipe } from './pipes/time.pipe';
import { TimeTrackerComponent } from './components/time-tracker/time-tracker.component';
import { TimeEntryPipe } from './pipes/time-entry.pipe';
import { TimeEntriesService } from './services/time-entries.service';
import { TimerService } from './services/timer.service';

import { TimeTrackerEffects } from './store/time-tracker.effects';
import * as fromTimeTracker from './store/time-tracker.reducers';

const routes: Routes = [
    {
        path: '',
        component: TimeTrackerComponent,
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedComponentsModule,
        StoreModule.forFeature('timeTracker', fromTimeTracker.timeTrackerReducer),
        EffectsModule.forFeature([TimeTrackerEffects])
    ],
    declarations: [
        TimerComponent,
        TimeTrackerComponent,

        TimePipe,
        TimeEntryPipe
    ],
    providers: [
        TimeEntriesService,
        TimerService,
        DatePipe,
        TimePipe
    ],
    entryComponents: []
})

export class TimeTrackerModule {
}
