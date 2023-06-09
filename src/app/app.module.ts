import { APP_INITIALIZER, Injector, NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AkitaNgDevtools } from "@datorama/akita-ngdevtools";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { APP_REF } from "@core/app-ref";
import { AbstractNavigationService, NavigationService } from "@core/navigation.service";
import { AbstractProductDataService, LZAbstractAuthDataService, LZDefaultAuthDataService, ProductDataService } from "@core/data-service";
import { FooterModule } from "@modules/footer/footer.module";
import { HeaderModule } from "@modules/header/header.module";
import { LzQuery } from "@core/store/lz.query";
import { LzService } from "@core/store/lz.service";
import { LzStore } from "@core/store/lz.store";

import { LZCalendarModule, LZToastrModule } from "./components";

import { AbstractCartProductDataService, CartProductDataService } from "@core/data-service/cart-product-data.service";
import { AbstractProductCartService, ProductCartService } from "@components/shared/product-cart/product-cart.service";
import { environment } from "environments/environment";
import { initProductCartFactory } from "./factory/init-product-cart.factory";

@NgModule({
    declarations: [AppComponent],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        FooterModule,
        AkitaNgDevtools.forRoot(),
        LZToastrModule.forRoot(),
        HeaderModule,
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
        LzQuery,
        LzService,
        LzStore,
        {
            provide: APP_INITIALIZER,
            multi: true,
            useFactory: initProductCartFactory,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(private injector: Injector) {
        APP_REF.injector = injector;
        APP_REF.environment = environment;
    }
}
