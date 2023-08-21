import { HttpResponse } from "@angular/common/http";

import { isNil } from "@datorama/akita";

import { EQUALS_PATTERN, GREATER_OR_EQUAL_PATTERN, LESS_OR_EQUAL_PATTERN } from "./patterns";
import { PaginationListItems, SearchConditions, TOTAL_COUNT_HEADER } from "../types";
import { Valuable } from "@shared-types/common/common";

export const conditionsMap: Record<SearchConditions, RegExp> = {
    [SearchConditions.EQUAL]: EQUALS_PATTERN,
    [SearchConditions.GREATER_OR_EQUAL]: GREATER_OR_EQUAL_PATTERN,
    [SearchConditions.LESS_OR_EQUAL]: LESS_OR_EQUAL_PATTERN,
};

export function convertBooleanToTableValues(value: boolean): string {
    return value ? "+" : "-";
}

export function mapPaginationResponseToListModel<T>(response: HttpResponse<T[]>): PaginationListItems<T> {
    const countHeader = response.headers.get(TOTAL_COUNT_HEADER);
    return {
        items: response.body ?? [],
        count: Number(countHeader),
    };
}

export function filterToQueryParameter(condition: SearchConditions, value: number | string | string[] | number[]): string {
    const stringValue = Array.isArray(value) ? value.join(",") : String(value);
    return `${condition}(${stringValue})`;
}

export function defaultCompareFunction<T = unknown, K = T>(sourceItem: T, destinationItem: K): boolean {
    return Object.is(sourceItem, destinationItem);
}

export function isItemsInDifferentArray<T = string, K = T>(
    source: T[],
    dest: K[],
    findFunction: (sourceItem: T, destinationItem: K) => boolean = defaultCompareFunction,
): boolean {
    return source.some(sourceItem => !!dest.find(destinationItem => findFunction(sourceItem, destinationItem)));
}

export function getPaginationRequestParams(): Record<string, string> {
    return {
        offset: filterToQueryParameter(SearchConditions.EQUAL, 0),
        limit: filterToQueryParameter(SearchConditions.EQUAL, 25),
    };
}

export function objectWithoutNulls<T extends Record<string, unknown>>(obj: T): Valuable<T> {
    return Object.fromEntries(Object.entries(obj).filter(([, v]) => !isNil(v))) as Valuable<T>;
}

export function normalizeToIntNumber(value: number, min: number, max: number): number {
    if (value > max) {
        return max;
    }

    if (value < min) {
        return min;
    }

    return Math.round(value);
}

export function isNumberInRange(value: number, from: number, to: number): boolean {
    return value >= from && value <= to;
}
