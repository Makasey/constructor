import { CampaignListState, EditorState, FilesState, ModuleState, TableModuleState, TableState, UIDataState } from "@core";
import { ROOT_ELEMENT_ID, SitePageElementType, StyleUnit } from "@modules/constructor";
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
            [ROOT_ELEMENT_ID]: {
                id: ROOT_ELEMENT_ID,
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
        campaignName: "My best campaign",
        selectedElement: ROOT_ELEMENT_ID,
        selectedPage: pageID,
        pages: [
            {
                id: pageID,
                settings: {
                    title: "My best site",
                    logotype: null,
                    siteDescription: "My best site",
                    siteMetaTags: "",
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
