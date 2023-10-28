import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule, EVENT_MANAGER_PLUGINS } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { Injector, NgModule } from "@angular/core";

import { AkitaNgDevtools } from "@datorama/akita-ngdevtools";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import {
    APP_REF,
    AbstractCampaignDataService,
    AbstractFilesDataService,
    AbstractNavigationService,
    CampaignDataService,
    DefaultFilesDataService,
    LZAbstractAuthDataService,
    LZDefaultAuthDataService,
    LzQuery,
    LzService,
    LzStore,
    NavigationService,
} from "@core";

import { HostBinderAsyncPlugin, PreventEventPlugin, SilentEventPlugin, StopEventPlugin } from "@shared-plugins";
import { LZCalendarModule, LZToastrModule } from "@components";
import { environment } from "environments/environment";

@NgModule({
    declarations: [AppComponent],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        AkitaNgDevtools.forRoot(),
        LZToastrModule.forRoot(),
        HttpClientModule,
        LZCalendarModule,
    ],
    providers: [
        {
            provide: AbstractNavigationService,
            useClass: NavigationService,
        },
        {
            provide: LZAbstractAuthDataService,
            useClass: LZDefaultAuthDataService,
        },
        {
            provide: EVENT_MANAGER_PLUGINS,
            multi: true,
            useClass: HostBinderAsyncPlugin,
        },
        {
            provide: AbstractCampaignDataService,
            useClass: CampaignDataService,
        },
        {
            provide: AbstractFilesDataService,
            useClass: DefaultFilesDataService,
        },
        {
            provide: EVENT_MANAGER_PLUGINS,
            multi: true,
            useClass: SilentEventPlugin,
        },
        {
            provide: EVENT_MANAGER_PLUGINS,
            multi: true,
            useClass: StopEventPlugin,
        },
        {
            provide: EVENT_MANAGER_PLUGINS,
            multi: true,
            useClass: PreventEventPlugin,
        },
        LzQuery,
        LzService,
        LzStore,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(private injector: Injector) {
        APP_REF.injector = injector;
        APP_REF.environment = environment;
    }
}
