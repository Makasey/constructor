import { APFormModel } from "@components/ui";
import { Product } from "@shared-types/index";

import {
    CampaignListState,
    CatalogFiltersState,
    CatalogProductsState,
    EditorState,
    FilesState,
    ModuleState,
    ProductCartState,
    RootModuleState,
    TableModuleState,
    TestState,
    UIDataState,
} from "@core/store";
import { ROOT_ELEMENT_ID, SitePageElementType, StyleUnit } from "@modules/constructor/components/edit-area/types";
import { TableState } from "@core/store/states/ui-states";

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
            id: undefined,
            logotype: null,
            siteDescription: "My best site",
            siteMetaTags: "",
            campaignName: "My best campaign",
        },
    };
}

export function initialCampaignListState(): CampaignListState {
    return {
        ...initialModuleDataState(),
        ...initialTableModuleState(),
        campaigns: [],
    };
}

export function initialFilesState(): FilesState {
    return {
        ...initialModuleDataState(),
        files: [],
    };
}

export function initialTableState(): TableState {
    return {
        ...initialModuleDataState(),
        tableExtra: {
            hasCheckboxes: false,
            clickableRows: false,
            draggableHeader: false,
            selectAll: false,
            hoverableRows: false,
            hasSelectAllCheckbox: false,
            isHierarchical: false,
            noRecordsLabel: "",
            idKey: "id",
            nameKey: "label",
            highlightedId: null,
            pageLoading: false,
        },
        tableMeta: [],
        tableRows: [],
        valuesExtra: {},
        selectedRows: [],
        isDragging: false,
    };
}
