import { DevtoolsOptions, akitaDevtools } from "@datorama/akita";
import { ENVIRONMENT_INITIALIZER, NgZone, Provider, inject } from "@angular/core";

import { LzQuery, LzService, LzStore } from "@core";

export const STORE_PROVIDERS = [LzQuery, LzService, LzStore];

export function provideAkitaDevtools(options: Partial<DevtoolsOptions> = {}): Provider {
    return {
        provide: ENVIRONMENT_INITIALIZER,
        multi: true,
        useFactory() {
            return () => {
                akitaDevtools(inject(NgZone), options);
            };
        },
    };
}
