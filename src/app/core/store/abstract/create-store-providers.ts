import { InjectionToken, Provider } from "@angular/core";
import { Query, Store } from "@datorama/akita";

import {
    AbstractLzStoreService,
    LzAbstractQuery,
    LzQueryInjectionTokensMap,
    LzServiceInjectionTokensMap,
    LzState,
    LzStoreService,
    lzInitialStateFunctions,
} from "@core";

export function createStoreProviders<T extends keyof LzState>(stateKey: T): Provider[] {
    const store = new Store<LzState[T]>(lzInitialStateFunctions[stateKey](), {
        name: `[LZ-STATE]_${stateKey} Alexey I will definitely save it :)`,
    });

    if (!LzQueryInjectionTokensMap[stateKey]) {
        LzQueryInjectionTokensMap[stateKey] = new InjectionToken<LzAbstractQuery<T>>(`LZ_QUERY_${stateKey}`);
    }

    if (!LzServiceInjectionTokensMap[stateKey]) {
        LzServiceInjectionTokensMap[stateKey] = new InjectionToken<AbstractLzStoreService<T>>(`LZ_QUERY_${stateKey}`);
    }

    return [
        {
            provide: LzQueryInjectionTokensMap[stateKey],
            useFactory: (): Query<LzState[T]> => new Query<LzState[T]>(store),
        },
        {
            provide: LzServiceInjectionTokensMap[stateKey],
            useFactory: (): LzStoreService<T> => new LzStoreService<T>(store),
        },
    ];
}
