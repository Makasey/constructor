import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";

import { LzPreloadFiltersComponent, LzPreloadTableComponent } from "../../components/ui/preload-background";
import { NumberToArrayModule } from "../../pipes";
import { PreloadDirective } from "./preload.directive";
import {
  CUSTOM_PRELOAD_BACKGROUND_CONFIG_TOKEN,
  PRELOAD_BACKGROUND_CONFIG_TOKEN,
  PreloadCustomModuleConfig,
  preloadBackgroundComponentsMap,
  preloadBackgroundConfigFactory,
} from "./types";

@NgModule({
    providers: [
        {
            useValue: preloadBackgroundComponentsMap,
            provide: PRELOAD_BACKGROUND_CONFIG_TOKEN,
        },
    ],
    declarations: [LzPreloadFiltersComponent, LzPreloadTableComponent, PreloadDirective],
    imports: [CommonModule, NumberToArrayModule],
    exports: [LzPreloadFiltersComponent, LzPreloadTableComponent, PreloadDirective],
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
