import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule, EVENT_MANAGER_PLUGINS } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { Injector, NgModule } from "@angular/core";

import { AkitaNgDevtools } from "@datorama/akita-ngdevtools";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { APP_REF } from "@core/app-ref";
import { AbstractNavigationService, NavigationService } from "@core/navigation.service";
import { AbstractProductDataService, LZAbstractAuthDataService, LZDefaultAuthDataService, ProductDataService } from "@core/data-service";
import { LzQuery } from "@core/store/lz.query";
import { LzService } from "@core/store/lz.service";
import { LzStore } from "@core/store/lz.store";

import { LZCalendarModule, LZToastrModule } from "./components";

import { AbstractCampaignDataService, CampaignDataService } from "@core/data-service/campaign-data.service";
import { AbstractCartProductDataService, CartProductDataService } from "@core/data-service/cart-product-data.service";
import { AbstractProductCartService, ProductCartService } from "@components/shared/product-cart/product-cart.service";
import { HostBinderAsyncPlugin } from "./plugins/host-binder-async.plugin";
import { SilentEventPlugin } from "./plugins/silent-event.plugin";
import { StopEventPlugin } from "./plugins/stop-event.plugin";
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
            provide: AbstractProductDataService,
            useClass: ProductDataService,
        },
        {
            provide: LZAbstractAuthDataService,
            useClass: LZDefaultAuthDataService,
        },
        {
            provide: AbstractCartProductDataService,
            useClass: CartProductDataService,
        },
        {
            provide: AbstractProductCartService,
            useClass: ProductCartService,
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
        // {
        //     provide: APP_INITIALIZER,
        //     multi: true,
        //     useFactory: initProductCartFactory,
        // },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(private injector: Injector) {
        APP_REF.injector = injector;
        APP_REF.environment = environment;
    }
}
