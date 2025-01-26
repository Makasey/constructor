import { ArrayOrIterable, CollectFnConfig, Primitive } from "@shared-types";
import { isObjectEquals } from "@shared-utils";

export function defaultCollectFn<T = unknown>(sourceItem: T): Primitive {
    return sourceItem as unknown as Primitive;
}

export function moveItemsInArray<T>(newIndex: number, oldIndex: number, items: T[]): T[] {
    if (newIndex < 0 || newIndex > items.length - 1) {
        throw new Error(`Invalid arguments, new index should be from 0 to ${items.length - 1}, current value: ${newIndex}`);
    }

    if (!items.length) {
        return items;
    }

    if (items[newIndex] === undefined || items[oldIndex] === undefined) {
        throw new Error(`Invalid arguments, there are no elements at indexes`);
    }

    return items.map((item, index, array) => {
        if (index === newIndex) {
            return array[oldIndex];
        }

        if (index === oldIndex) {
            return array[newIndex];
        }

        return item;
    });
}

export function coerceArray<T = unknown>(arrayOrItem: T | T[]): T[] {
    if (arrayOrItem === null || arrayOrItem === undefined) {
        return [];
    }

    return Array.isArray(arrayOrItem) ? arrayOrItem : [arrayOrItem];
}

export function hasIntersection<T = string, K = T>({
    source = [],
    destination = [],
    destinationCollectFn = defaultCollectFn,
    sourceCollectFn = defaultCollectFn,
}: CollectFnConfig<T, K>): boolean {
    if (!source.length || !destination.length) {
        return false;
    }

    const mappedSource = source.map(sourceItem => sourceCollectFn(sourceItem));
    const sourceCollection = new Set(mappedSource);

    return destination.some(destinationItem => {
        const processedDestinationItem = destinationCollectFn(destinationItem);

        return sourceCollection.has(processedDestinationItem);
    });
}

export function isArrayEquals<T = unknown>(target: ArrayOrIterable<T>, other: ArrayOrIterable<T>): boolean {
    if (!target || !other) {
        return false;
    }

    const targetArray = Array.isArray(target) ? target : Array.from<T>(target);
    const otherArray = Array.isArray(other) ? other : Array.from<T>(other);

    return (
        targetArray.length === otherArray.length &&
        targetArray.every(element => otherArray.findIndex(otherElement => isObjectEquals(element, otherElement)) !== -1)
    );
}
