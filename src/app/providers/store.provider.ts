import { ENVIRONMENT_INITIALIZER, NgZone, inject, Provider } from "@angular/core";
import { akitaDevtools, DevtoolsOptions} from "@datorama/akita";

import { LzQuery, LzService, LzStore } from "@core";

export const STORE_PROVIDERS = [LzQuery, LzService, LzStore];

export function provideAkitaDevtools(options: Partial<DevtoolsOptions> = {}): Provider {
    return {
        provide: ENVIRONMENT_INITIALIZER,
        multi: true,
        useFactory() {
            return () => {
                akitaDevtools(inject(NgZone), options);
            }
        }
    }
}