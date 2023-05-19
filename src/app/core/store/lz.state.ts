import { CatalogFiltersState, RootModuleState } from "./states/ui-states";
import { InitialStateFunctions } from "./types";
import { initialCatalogFiltersState, initialRootModuleState } from "./initial-states/initial-states.type";

export enum LzStateKey {
    ROOT_STATE = "rootState",
    CATALOG_FILTERS_STATE = "catalogFiltersState",
}

export type LzState = Readonly<{
    [LzStateKey.ROOT_STATE]: RootModuleState;
    [LzStateKey.CATALOG_FILTERS_STATE]: CatalogFiltersState;
}>;

export const lzInitialStateFunctions: InitialStateFunctions = {
    [LzStateKey.ROOT_STATE]: initialRootModuleState,
    [LzStateKey.CATALOG_FILTERS_STATE]: initialCatalogFiltersState,
};

export function createLZInitialState(): LzState {
    return Object.keys(lzInitialStateFunctions).reduce((result, next: string) => {
        return {
            ...result,
            [next]: lzInitialStateFunctions[next] && lzInitialStateFunctions[next](),
        };
    }, {}) as LzState;
}
