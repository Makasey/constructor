import { AbstractLzStoreService, LzStoreService } from "@core/store/abstract/lz-abstract.service";
import { InjectionToken, Provider } from "@angular/core";
import { LzAbstractQuery } from "@core/store/abstract/lz-abstract.query";
import { LzQueryInjectionTokensMap, LzServiceInjectionTokensMap } from "@core/store/abstract/types";
import { LzState, lzInitialStateFunctions } from "@core/store/lz.state";
import { Query, Store } from "@datorama/akita";

export function createStoreProviders<T extends keyof LzState>(stateKey: T): Provider[] {
    const store = new Store<LzState[T]>(lzInitialStateFunctions[stateKey](), {
        name: `lz-${stateKey}`,
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
