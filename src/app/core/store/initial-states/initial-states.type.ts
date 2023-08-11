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
                children: [2, 3, 4],
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
            "2": {
                id: 2,
                type: SitePageElementType.SECTION,
                isExtendable: true,
                children: [5],
                parentId: 1,
                settings: {
                    width: {
                        value: 100,
                        unit: StyleUnit.PERCENT,
                    },
                    height: {
                        value: 200,
                        unit: StyleUnit.PX,
                    },
                },
            },
            "3": {
                id: 3,
                type: SitePageElementType.SECTION,
                children: [],
                parentId: 1,
                isExtendable: false,
                settings: {
                    width: {
                        value: 100,
                        unit: StyleUnit.PERCENT,
                    },
                    height: {
                        value: 200,
                        unit: StyleUnit.PX,
                    },
                },
            },
            "4": {
                id: 4,
                type: SitePageElementType.SECTION,
                isExtendable: false,
                children: [],
                parentId: 1,
                settings: {
                    width: {
                        value: 100,
                        unit: StyleUnit.PERCENT,
                    },
                    height: {
                        value: 200,
                        unit: StyleUnit.PX,
                    },
                },
            },
            "5": {
                id: 5,
                type: SitePageElementType.TITLE,
                children: [],
                parentId: 2,
                isExtendable: false,
                settings: {
                    width: {
                        value: 100,
                        unit: StyleUnit.PERCENT,
                    },
                    height: {
                        value: 20,
                        unit: StyleUnit.PX,
                    },
                    text: "The BEST OF THE BEST",
                },
            },
        },
        selectedElement: ROOT_ELEMENT_ID,
        currentStateIndex: 6,
        settings: {
            title: "My best site",
            id: 1,
            siteDescription: "My best site",
            siteMetaTags: "",
            campaignName: "My best campaign",
        },
    };
}
