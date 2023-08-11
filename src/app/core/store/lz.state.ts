import { CatalogFiltersState, CatalogProductsState, EditorState, ProductCartState, RootModuleState, TestState } from "./states/ui-states";
import { InitialStateFunctions } from "./types";
import {
    initialCatalogFiltersState,
    initialCatalogProductState,
    initialEditorState,
    initialProductCartState,
    initialRootModuleState,
    initialTestState,
} from "./initial-states/initial-states.type";

export enum LzStateKey {
    ROOT_STATE = "rootState",
    CATALOG_FILTERS_STATE = "catalogFiltersState",
    CATALOG_PRODUCTS_STATE = "catalogProductsState",
    PRODUCT_CART_STATE = "productCartState",
    TEST_STATE = "testState",
    EDITOR_STATE = "editorState",
}

export type LzState = Readonly<{
    [LzStateKey.ROOT_STATE]: RootModuleState;
    [LzStateKey.CATALOG_FILTERS_STATE]: CatalogFiltersState;
    [LzStateKey.CATALOG_PRODUCTS_STATE]: CatalogProductsState;
    [LzStateKey.PRODUCT_CART_STATE]: ProductCartState;
    [LzStateKey.TEST_STATE]: TestState;
    [LzStateKey.EDITOR_STATE]: EditorState;
}>;

export const lzInitialStateFunctions: InitialStateFunctions = {
    [LzStateKey.ROOT_STATE]: initialRootModuleState,
    [LzStateKey.CATALOG_FILTERS_STATE]: initialCatalogFiltersState,
    [LzStateKey.CATALOG_PRODUCTS_STATE]: initialCatalogProductState,
    [LzStateKey.PRODUCT_CART_STATE]: initialProductCartState,
    [LzStateKey.TEST_STATE]: initialTestState,
    [LzStateKey.EDITOR_STATE]: initialEditorState,
};

export function createLZInitialState(): LzState {
    return Object.keys(lzInitialStateFunctions).reduce((result, next: string) => {
        const initialFunction = lzInitialStateFunctions[next] as () => LzState;

        if (!initialFunction) {
            return result;
        }

        return {
            ...result,
            [next]: initialFunction(),
        };
    }, {}) as LzState;
}
