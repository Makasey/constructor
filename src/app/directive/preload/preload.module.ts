import { CUSTOM_PRELOAD_BACKGROUND_CONFIG_TOKEN, PRELOAD_BACKGROUND_CONFIG_TOKEN, PreloadCustomModuleConfig, preloadBackgroundComponentsMap, preloadBackgroundConfigFactory } from "./types";
import { CommonModule } from "@angular/common";
import { LzPreloadTableComponent } from "../../components/preload-background";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { PreloadDirective } from "./preload.directive";

@NgModule({
    providers: [
        {
            useValue: preloadBackgroundComponentsMap,
            provide: PRELOAD_BACKGROUND_CONFIG_TOKEN,
        },
    ],
    declarations: [PreloadDirective, LzPreloadTableComponent],
    imports: [CommonModule],
    exports: [LzPreloadTableComponent, PreloadDirective],
})
export class PreloadDirectiveModule {
    public static forRoot(moduleConfig: PreloadCustomModuleConfig = {}): ModuleWithProviders<PreloadDirectiveModule> {
        return {
            providers: [
                {
                    provide: CUSTOM_PRELOAD_BACKGROUND_CONFIG_TOKEN,
                    useValue: moduleConfig.config,
                },
                {
                    provide: PRELOAD_BACKGROUND_CONFIG_TOKEN,
                    useFactory: preloadBackgroundConfigFactory,
                    deps: [CUSTOM_PRELOAD_BACKGROUND_CONFIG_TOKEN],
                },
            ],
            ngModule: PreloadDirectiveModule,
        };
    }
}
