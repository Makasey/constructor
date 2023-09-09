import {
    CampaignListState,
    CatalogFiltersState,
    CatalogProductsState,
    EditorState,
    FilesState,
    InitialStateFunctions,
    ProductCartState,
    RootModuleState,
    TestState,
    initialCampaignListState,
    initialCatalogFiltersState,
    initialCatalogProductState,
    initialEditorState,
    initialFilesState,
    initialProductCartState,
    initialRootModuleState,
    initialTestState,
} from "@core/store";
import { TableState } from "@core/store/states/ui-states";
import { initialTableState } from "@core/store/initial-states/initial-states.type";

export enum LzStateKey {
    ROOT_STATE = "rootState",
    CATALOG_FILTERS_STATE = "catalogFiltersState",
    CATALOG_PRODUCTS_STATE = "catalogProductsState",
    PRODUCT_CART_STATE = "productCartState",
    TABLE_STATE = "tableState",
    TEST_STATE = "testState",
    FILES_STATE = "filesState",
    EDITOR_STATE = "editorState",
    CAMPAIGN_LIST = "campaignList",
}

export type LzState = Readonly<{
    [LzStateKey.ROOT_STATE]: RootModuleState;
    [LzStateKey.CATALOG_FILTERS_STATE]: CatalogFiltersState;
    [LzStateKey.CATALOG_PRODUCTS_STATE]: CatalogProductsState;
    [LzStateKey.PRODUCT_CART_STATE]: ProductCartState;
    [LzStateKey.TEST_STATE]: TestState;
    [LzStateKey.FILES_STATE]: FilesState;
    [LzStateKey.EDITOR_STATE]: EditorState;
    [LzStateKey.TABLE_STATE]: TableState;
    [LzStateKey.CAMPAIGN_LIST]: CampaignListState;
}>;

export const lzInitialStateFunctions: InitialStateFunctions = {
    [LzStateKey.ROOT_STATE]: initialRootModuleState,
    [LzStateKey.CATALOG_FILTERS_STATE]: initialCatalogFiltersState,
    [LzStateKey.CATALOG_PRODUCTS_STATE]: initialCatalogProductState,
    [LzStateKey.PRODUCT_CART_STATE]: initialProductCartState,
    [LzStateKey.TEST_STATE]: initialTestState,
    [LzStateKey.FILES_STATE]: initialFilesState,
    [LzStateKey.EDITOR_STATE]: initialEditorState,
    [LzStateKey.TABLE_STATE]: initialTableState,
    [LzStateKey.CAMPAIGN_LIST]: initialCampaignListState,
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
