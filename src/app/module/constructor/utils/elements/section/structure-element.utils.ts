import { ColumnStructure, columnStructureCountMap } from "@modules/constructor";

export function processStructureType(type: ColumnStructure): string[] {
    const count = columnStructureCountMap[type];

    return Array.from({ length: count }).map((_, index) => `${index}`);
}
