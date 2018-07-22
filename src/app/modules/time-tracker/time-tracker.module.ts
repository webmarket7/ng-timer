import { NgModule } from '@angular/core';
import { CommonModule, DatePipe} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedComponentsModule } from '../../shared-components/shared-components.module';
import { DynamicModule } from 'ng-dynamic-component';

import { TimeEntriesService } from './services/time-entries.service';
import { TimerService } from './services/timer.service';
import { TasksService } from './tasks.service';

import { TimeTrackerComponent } from './time-tracker.component';
import { TimerComponent } from './components/timer/timer.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskFormComponent } from './popups/task-form/task-form.component';
import { TimeEntriesComponent } from './components/time-entries/time-entries.component';

import { TimePipe } from './pipes/time.pipe';
import { TimeEntryPipe } from './pipes/time-entry.pipe';
import { TaskPipe } from './pipes/task.pipe';

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
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        SharedComponentsModule,
        StoreModule.forFeature('timeTracker', fromTimeTracker.timeTrackerReducer),
        EffectsModule.forFeature([TimeTrackerEffects]),
        DynamicModule.withComponents([TaskFormComponent])
    ],
    declarations: [
        TimerComponent,
        TimeTrackerComponent,
        TimeEntriesComponent,
        TasksComponent,
        TaskFormComponent,
        TimePipe,
        TimeEntryPipe,
        TaskPipe
    ],
    providers: [
        TimeEntriesService,
        TimerService,
        TasksService,
        DatePipe,
        TimePipe
    ],
    entryComponents: [
        TaskFormComponent
    ]
})

export class TimeTrackerModule {
}
