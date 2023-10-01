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

import { HostBinderAsyncPlugin, SilentEventPlugin, StopEventPlugin } from "./plugins";
import { LZCalendarModule, LZToastrModule } from "@components";
import { SocketIoConfig, SocketIoModule } from "ngx-socket-io";
import { environment } from "environments/environment";

const config: SocketIoConfig = { url: "http://localhost:7000", options: { transports: ["websocket"] } };

@NgModule({
    declarations: [AppComponent],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        SocketIoModule.forRoot(config),
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
