import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RoutingModule } from './routing.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { SharedComponentsModule } from './shared-components/shared-components.module';
import { AppComponent } from './app.component';
import { timeTrackerReducer } from './modules/time-tracker/storage/time-tracker.reducers';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        RoutingModule,
        HttpClientModule,
        SharedComponentsModule,
        StoreModule.forRoot({timeTracker: timeTrackerReducer})
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
