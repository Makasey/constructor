import { PreloadTableComponent } from "../../components/preload-background";
import { Type } from "@angular/core";

export enum PreloadBackgroundComponentKey {
    TABLE = "table",
}

export const preloadBackgroundComponentsMap: Record<PreloadBackgroundComponentKey, Type<unknown>> = {
    [PreloadBackgroundComponentKey.TABLE]: PreloadTableComponent,
};

export interface PreloadBackgroundComponent<T> {
    test: T;
}
