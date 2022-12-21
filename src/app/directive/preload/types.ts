import { InjectionToken, Type } from "@angular/core";
import { LzPreloadTableComponent } from "../../components/preload-background";

export enum PreloadBackgroundComponentKey {
    TABLE = "table",
}

export const preloadBackgroundComponentsMap: PreloadBackgroundComponents = {
    [PreloadBackgroundComponentKey.TABLE]: LzPreloadTableComponent,
};

// export interface PreloadBackgroundComponent<T> {
//     test: T;
// }

export type PreloadBackgroundComponents = Record<string, Type<unknown>>;

export type PreloadCustomModuleConfig = {
    config?: PreloadBackgroundComponents;
};

export const PRELOAD_BACKGROUND_CONFIG_TOKEN = new InjectionToken<string>("preloadBackgroundConfigToken");

export const CUSTOM_PRELOAD_BACKGROUND_CONFIG_TOKEN = new InjectionToken<string>("customPreloadBackgroundConfigToken");

export const PRELOAD_COMPONENTS_CONFIG = new InjectionToken<string>("preloadComponentsConfig");

export function preloadBackgroundConfigFactory(customConfig: PreloadBackgroundComponents): PreloadBackgroundComponents {
    return {
        ...preloadBackgroundComponentsMap,
        ...customConfig,
    };
}
