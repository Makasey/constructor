import { APDropdownFieldModule } from "./components/controls";
import { APP_REF } from "./core/app-ref";
import { AbstractNavigationService, NavigationService } from "./core/navigation.service";
import { AbstractProductDataService, ProductDataService } from "./core/data-service";
import { AkitaNgDevtools } from "@datorama/akita-ngdevtools";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { CheckboxGroupModule, ColorPickerModule, OrdersModule, RangeControllerModule } from "./components";
import { HttpClientModule } from "@angular/common/http";
import { Injector, NgModule } from "@angular/core";
import { LZToastrModule } from "./components/toastr/toastr.module";
import { LzProductInfoModule } from "./modules/product-info/product-info.module";
import { LzQuery } from "./core/store/lz.query";
import { LzService } from "./core/store/lz.service";
import { LzStore } from "./core/store/lz.store";
import { ModalModule } from "./components/modal";
import { PreloadDirectiveModule } from "./directive/preload/preload.module";
import { TestComponent } from "./module/test/test.component";
import { environment } from "../environments/environment";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        OrdersModule,
        CheckboxGroupModule,
        RangeControllerModule,
        HttpClientModule,
        APDropdownFieldModule,
        ColorPickerModule,
        ModalModule,
        BrowserAnimationsModule,
        AkitaNgDevtools.forRoot(),
        LZToastrModule.forRoot(),
        PreloadDirectiveModule.forRoot({
            config: {
                test: TestComponent,
            },
        }),
        LzProductInfoModule,
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
        LzService,
        LzQuery,
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
