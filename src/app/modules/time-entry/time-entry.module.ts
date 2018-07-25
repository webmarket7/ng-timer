import { NgModule } from '@angular/core';
import { SharedComponentsModule } from '../../shared-components/shared-components.module';
import { CommonModule } from '@angular/common';
import { TimeEntriesService } from './services/time-entries.service';
import { TimeEntriesComponent } from './components/time-entries/time-entries.component';
import { StoreModule } from '@ngrx/store';
import * as fromTimeEntry from './store/time-entry.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TimeEntryEffects } from './store/time-entry.effects';
import { TimeEntryPipe } from './pipes/time-entry.pipe';

@NgModule({
    imports: [
        CommonModule,
        SharedComponentsModule,
        StoreModule.forFeature('timeEntry', fromTimeEntry.reducer),
        EffectsModule.forFeature([TimeEntryEffects])
    ],
    declarations: [
        TimeEntriesComponent,
        TimeEntryPipe
    ],
    providers: [
        TimeEntriesService
    ],
    exports: [
        TimeEntriesComponent,
        TimeEntryPipe
    ]
})
export class TimeEntryModule {
}
