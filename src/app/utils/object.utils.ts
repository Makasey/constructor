import { isObject } from "@datorama/akita";

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
            return (
                targetItem.length === otherItem.length &&
                targetItem.every(element => !!otherItem.find(otherElement => isObjectEquals(element, otherElement)))
            );
        }

        if (isObject(targetItem) && isObject(otherItem)) {
            return isObjectEquals(targetItem, otherItem);
        }

        return targetItem === otherItem;
    });
}
