import { Injector } from "@angular/core";

export interface AppRefConfig {
    injector?: Injector;
    environment?: Record<string, unknown>;
}

export const APP_REF: AppRefConfig = {};
