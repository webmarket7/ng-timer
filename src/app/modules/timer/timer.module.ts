import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerRoutingModule } from './timer-routing.module';
import { SharedComponentsModule } from '../../shared-components/shared-components.module';
import { TaskModule } from '../task/task.module';
import { TimeEntryModule } from '../time-entry/time-entry.module';
import { TrackerComponent } from './tracker.component';
import { TimerComponent } from './components/timer/timer.component';
import { EffectsModule } from '@ngrx/effects';
import { TimerEffects } from './store/timer.effects';
import { StoreModule } from '@ngrx/store';
import * as fromTimer from './store/timer.reducer';

@NgModule({
    imports: [
        CommonModule,
        TimerRoutingModule,
        SharedComponentsModule,
        TaskModule,
        TimeEntryModule,
        StoreModule.forFeature('timer', fromTimer.reducer),
        EffectsModule.forFeature([TimerEffects])
    ],
    declarations: [
        TrackerComponent,
        TimerComponent
    ],
    providers: []
})
export class TimerModule {
}
