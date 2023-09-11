import { TableExtra, TableValueExtraInternalParams } from "../interfaces";
import { TableState, UIDataState } from "@core/store/states/ui-states";

export const DEFAULT_LOAD_MORE_LABEL = "Load more data";

export const TABLE_CELL_HEIGHT = 48;

export const DEFAULT_VALUE_EXTRA_ITEM: TableValueExtraInternalParams = {
    level: 1,
    pageLoading: false,
    children: undefined,
    parentId: undefined,
    childrenLength: 0,
    levelToShow: 0,
    opened: false,
    selected: false,
    isExpanded: false,
    expandTemplateKey: undefined,
    scrollable: false,
    rowSubTemplateKey: undefined,
    hasChild: false,
    parents: [],
    disabled: false,
    checkboxDisabled: false,
    customData: {},
    hasNextPage: false,
    rowCustomClass: undefined,
};

export const defaultTableExtra: TableExtra = {
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
};

export const initialTableStore: TableState = {
    dataState: UIDataState.INITIAL,
    tableExtra: defaultTableExtra,
    tableMeta: [],
    tableRows: [],
    valuesExtra: {},
    selectedRows: [],
    isDragging: false,
};
