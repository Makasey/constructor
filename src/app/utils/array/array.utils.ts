import { ArrayOrIterable } from "@shared-types";
import { isObjectEquals } from "@shared-utils";

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

export function isArrayEquals<T = unknown>(target: ArrayOrIterable<T>, other: ArrayOrIterable<T>): boolean {
    if(!target || !other) {
        return false;
    }

    const targetArray = Array.isArray(target) ? target: Array.from<T>(target);
    const otherArray =  Array.isArray(other) ? other : Array.from<T>(other);

    return (
        targetArray.length === otherArray.length &&
        targetArray.every(element => !!otherArray.find(otherElement => isObjectEquals(element, otherElement)))
    );
}

