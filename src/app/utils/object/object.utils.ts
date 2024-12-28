import { isNil, isObject } from "@datorama/akita";

import { Valuable } from "@shared-types";
import { isArrayEquals } from "@shared-utils";
import { TypeKeys } from "@modules/constructor";

export function objectWithoutNulls<T extends Record<string, unknown>>(obj: T): Valuable<T> {
    return Object.fromEntries(Object.entries(obj).filter(([, v]) => !isNil(v))) as Valuable<T>;
}

export function isObjectEquals<T = Record<string, unknown>>(target: T, other: T): boolean {
    if ((!isObject(target) && isObject(other)) || (isObject(target) && !isObject(other))) {
        return false;
    }

    if (!isObject(target) && !isObject(other)) {
        return target === other;
    }

    return (Object.keys(target as Record<string, unknown>) as TypeKeys<T>).every(key => {
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
