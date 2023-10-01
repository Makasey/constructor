import { ColumnStructure, ColumnStructureElement, ElementHTMLTag } from "@modules/constructor";

export const defaultSectionTagControls = [
    { label: ElementHTMLTag.SECTION, value: ElementHTMLTag.SECTION },
    { label: ElementHTMLTag.DIV, value: ElementHTMLTag.DIV },
    { label: ElementHTMLTag.ARTICLE, value: ElementHTMLTag.ARTICLE },
];

export const defaultSectionOpacityStep = 0.01;

export const columnStructureMap: Record<ColumnStructure, string> = {
    [ColumnStructure.ONE_COLUMN]: "1 Колонка",
    [ColumnStructure.TWO_COLUMNS]: "2 Колонки",
    [ColumnStructure.THREE_COLUMNS]: "3 Колонки",
};

export const columnStructureIconMap: Record<ColumnStructure, string> = {
    [ColumnStructure.ONE_COLUMN]: "one-column-icon.svg",
    [ColumnStructure.TWO_COLUMNS]: "two-columns-icon.svg",
    [ColumnStructure.THREE_COLUMNS]: "three-columns-icon.svg",
};

export const columnStructureElements: ColumnStructureElement[] = [
    {
        type: ColumnStructure.ONE_COLUMN,
        text: columnStructureMap[ColumnStructure.ONE_COLUMN],
        icon: columnStructureIconMap[ColumnStructure.ONE_COLUMN],
    },
    {
        type: ColumnStructure.TWO_COLUMNS,
        text: columnStructureMap[ColumnStructure.TWO_COLUMNS],
        icon: columnStructureIconMap[ColumnStructure.TWO_COLUMNS],
    },
    {
        type: ColumnStructure.THREE_COLUMNS,
        text: columnStructureMap[ColumnStructure.THREE_COLUMNS],
        icon: columnStructureIconMap[ColumnStructure.THREE_COLUMNS],
    },
];
