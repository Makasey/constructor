import { isObject } from "@datorama/akita";
import { ArrayOrIterable } from "@shared-types/";

export function isObjectEquals<T = Record<string, unknown>>(target: T, other: T): boolean {
    if ((!isObject(target) && isObject(other)) || (isObject(target) && !isObject(other))) {
        return false;
    }

    if (!isObject(target) && !isObject(other)) {
        return target === other;
    }

    return Object.keys(target as Record<string, unknown>).every(key => {
        const targetItem = target[key];
        const otherItem = other[key];


        if (Array.isArray(targetItem) && Array.isArray(otherItem)) {
            return isArrayEquals(targetItem, otherItem);
        }

        if (isObject(targetItem) && isObject(otherItem)) {
            return isObjectEquals(targetItem, otherItem);
        }

        return targetItem === otherItem;
    });
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
