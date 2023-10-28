import { HttpResponse } from "@angular/common/http";

import { isNil } from "@datorama/akita";

import { EQUALS_PATTERN, GREATER_OR_EQUAL_PATTERN, LESS_OR_EQUAL_PATTERN } from "@shared-utils";
import { PaginationListItems, SearchConditions, TOTAL_COUNT_HEADER, Valuable } from "@shared-types";

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

export function normalizeNumberValue(value: number, min: number, max: number): number {
    const processedMinValue = min ?? Number.MIN_SAFE_INTEGER;
    const processedMaxValue = max ?? Number.MAX_SAFE_INTEGER;

    if (value > processedMaxValue) {
        return processedMaxValue;
    }

    if (value < processedMinValue) {
        return processedMinValue;
    }

    return value;
}

export function normalizeMinValue(value: number, min: number): number {
    const processedMinValue = min ?? Number.MIN_SAFE_INTEGER;

    return Math.max(value, processedMinValue);
}

export function normalizeMaxValue(value: number, max: number): number {
    const processedMaxValue = max ?? Number.MAX_SAFE_INTEGER;

    return Math.min(value, processedMaxValue);
}

export function normalizeToIntNumber(value: number, min: number, max: number): number {
    return Math.round(normalizeNumberValue(value, min, max));
}

export function roundNumberWithFraction(value: number, fraction = 1): number {
    return Number(value.toFixed(fraction));
}

export function calculateFractionNumber(value: number): number {
    if (value >= 1) {
        return 1;
    }

    let fraction = 0;

    while (value < 1) {
        value = value * 10;

        fraction++;
    }

    return fraction;
}

export function isNumberInRange(value: number, from: number, to: number): boolean {
    return value >= from && value <= to;
}

export function getRandomString(count: number): string {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < count; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

export function getRandomId(): string {
    if ("randomUUID" in crypto) {
        return crypto.randomUUID();
    }

    return getRandomString(36);
}
