import { APFormModel } from "@components/ui";
import { Product } from "@shared-types/index";

import {
    CatalogFiltersState,
    CatalogProductsState,
    EditorState,
    ModuleState,
    ProductCartState,
    RootModuleState,
    TableModuleState,
    TestState,
    UIDataState,
} from "../states/ui-states";
import { ROOT_ELEMENT_ID, SitePageElementType, StyleUnit } from "@modules/constructor/components/edit-area/types";

export function initialTableModuleState(): TableModuleState {
    return {
        tableMeta: [],
        tableValues: [],
    };
}

export function initialModuleDataState(): ModuleState {
    return {
        dataState: UIDataState.INITIAL,
    };
}

export function initialRootModuleState(): RootModuleState {
    return {
        ...initialModuleDataState(),
        ...initialTableModuleState(),
        products: [] as Product[],
    };
}

export function initialCatalogFiltersState(): CatalogFiltersState {
    return {
        ...initialModuleDataState(),
        filters: {} as APFormModel,
    };
}

export function initialCatalogProductState(): CatalogProductsState {
    return {
        ...initialModuleDataState(),
        products: [],
        totalCount: 0,
    };
}

export function initialProductCartState(): ProductCartState {
    return {
        cart: null,
        dataState: UIDataState.INITIAL,
    };
}

export function initialTestState(): TestState {
    return {
        dataState: UIDataState.INITIAL,
    };
}

export function initialEditorState(): EditorState {
    return {
        dataState: UIDataState.LOADED,
        items: {
            [ROOT_ELEMENT_ID]: {
                id: 1,
                type: SitePageElementType.PAGE,
                children: [],
                isExtendable: true,
                parentId: null,
                settings: {
                    width: {
                        value: 1920,
                        unit: StyleUnit.PX,
                    },
                    height: {
                        value: 1080,
                        unit: StyleUnit.PX,
                    },
                },
            },
        },
        selectedElement: ROOT_ELEMENT_ID,
        currentStateIndex: 1,
        settings: {
            title: "My best site",
            id: 1,
            siteDescription: "My best site",
            siteMetaTags: "",
            campaignName: "My best campaign",
        },
    };
}
