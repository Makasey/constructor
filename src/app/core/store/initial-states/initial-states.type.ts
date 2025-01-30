import { CampaignListState, EditorState, FilesState, ModuleState, TableModuleState, TableState, UIDataState } from "@core";
import { SitePageElementType, StyleUnit } from "@modules/constructor";
import { getRandomId } from "@shared-utils";

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

export function initialEditorState(): EditorState {
    const pageID = getRandomId();

    return {
        dataState: UIDataState.LOADED,
        items: {
            [pageID]: {
                id: pageID,
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
                    title: "My best site",
                    logotype: null,
                    siteDescription: "My best site",
                    siteMetaTags: "",
                },
            },
        },
        campaignName: "My best campaign",
        selectedElement: pageID,
        selectedPage: pageID,
        savedShowItems: [],
        savedUpdatedItems: {},
        pages: [pageID],
        id: undefined,
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
        selectedRows: new Set(),
        isDragging: false,
    };
}
