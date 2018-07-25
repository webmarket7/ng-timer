import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../../shared-components/shared-components.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DynamicModule } from 'ng-dynamic-component';
import { TaskEffects } from './store/task.effects';
import { TasksService } from './services/tasks.service';
import { TaskPipe } from './pipes/task.pipe';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import * as fromTask from './store/task.reducer';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedComponentsModule,
        StoreModule.forFeature('task', fromTask.reducer),
        EffectsModule.forFeature([TaskEffects]),
        DynamicModule.withComponents([TaskFormComponent])
    ],
    declarations: [
        TasksComponent,
        TaskFormComponent,
        TaskPipe
    ],
    providers: [
        TasksService
    ],
    entryComponents: [
        TaskFormComponent
    ],
    exports: [
        TasksComponent,
        TaskFormComponent,
        TaskPipe
    ]
})
export class TaskModule {
}
