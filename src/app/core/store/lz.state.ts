import { CatalogFiltersState, CatalogProductsState, RootModuleState } from "./states/ui-states";
import { InitialStateFunctions } from "./types";
import { initialCatalogFiltersState, initialCatalogProductState, initialRootModuleState } from "./initial-states/initial-states.type";

export enum LzStateKey {
    ROOT_STATE = "rootState",
    CATALOG_FILTERS_STATE = "catalogFiltersState",
    CATALOG_PRODUCTS_STATE = "catalogProductsState",
}

export type LzState = Readonly<{
    [LzStateKey.ROOT_STATE]: RootModuleState;
    [LzStateKey.CATALOG_FILTERS_STATE]: CatalogFiltersState;
    [LzStateKey.CATALOG_PRODUCTS_STATE]: CatalogProductsState;
}>;

export const lzInitialStateFunctions: InitialStateFunctions = {
    [LzStateKey.ROOT_STATE]: initialRootModuleState,
    [LzStateKey.CATALOG_FILTERS_STATE]: initialCatalogFiltersState,
    [LzStateKey.CATALOG_PRODUCTS_STATE]: initialCatalogProductState,
};

export function createLZInitialState(): LzState {
    return Object.keys(lzInitialStateFunctions).reduce((result, next: string) => {
        return {
            ...result,
            [next]: lzInitialStateFunctions[next] && lzInitialStateFunctions[next](),
        };
    }, {}) as LzState;
}
