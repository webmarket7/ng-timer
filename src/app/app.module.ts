import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RoutingModule } from './routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.reducers';
import { SharedComponentsModule } from './shared-components/shared-components.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './modules/auth/auth.interceptor';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        RoutingModule,
        HttpClientModule,
        SharedComponentsModule,
        StoreModule.forRoot(reducers)
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
