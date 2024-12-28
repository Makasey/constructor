import { DevtoolsOptions, akitaDevtools } from "@datorama/akita";
import { EnvironmentProviders, NgZone, inject, provideEnvironmentInitializer } from "@angular/core";

import { LzQuery, LzService, LzStore } from "@core";

export const STORE_PROVIDERS = [LzQuery, LzService, LzStore];

export function provideAkitaDevtools(options: Partial<DevtoolsOptions> = {}): EnvironmentProviders {
    return provideEnvironmentInitializer(() => {
        const initializerFn = (() => {
            return () => {
                akitaDevtools(inject(NgZone), options);
            };
        })();
        return initializerFn();
    });
}
