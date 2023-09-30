import { CampaignListState, EditorState, FilesState, ModuleState, TableModuleState, TableState, UIDataState } from "@core";
import { ROOT_ELEMENT_ID, SitePageElementType, StyleUnit } from "@modules/constructor";

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
        selectedPage: 1,
        pages: [
            {
                id: 1,
                settings: {
                    title: "My best site",
                    id: undefined,
                    logotype: null,
                    siteDescription: "My best site",
                    siteMetaTags: "",
                    campaignName: "My best campaign",
                },
                children: [],
            },
        ],
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
        selectedRows: [],
        isDragging: false,
    };
}
