import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { Injector, NgModule } from "@angular/core";

import { AkitaNgDevtools } from "@datorama/akita-ngdevtools";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { APP_REF } from "./core/app-ref";
import { AbstractNavigationService, NavigationService } from "./core/navigation.service";
import { AbstractProductDataService, LZAbstractAuthDataService, LZDefaultAuthDataService, ProductDataService } from "./core/data-service";
import { LZCalendarModule, LZToastrModule } from "./components";
import { LzQuery } from "./core/store/lz.query";
import { LzService } from "./core/store/lz.service";
import { LzStore } from "./core/store/lz.store";

import { environment } from "../environments/environment";

@NgModule({
    declarations: [AppComponent],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AkitaNgDevtools.forRoot(),
        LZToastrModule.forRoot(),
        LZCalendarModule,
    ],
    providers: [
        {
            provide: AbstractNavigationService,
            useClass: NavigationService,
        },
        {
            provide: AbstractProductDataService,
            useClass: ProductDataService,
        },
        {
            provide: LZAbstractAuthDataService,
            useClass: LZDefaultAuthDataService,
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
