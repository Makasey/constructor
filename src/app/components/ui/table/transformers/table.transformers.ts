import { defaultTrackBy } from "../constants";


export function coerceNullableArray<T>(items: T[] | null): T[] {
    return items ?? [];
}

export function coerceNullableObject<T>(object: T | null): T {
    return object ?? {} as T;
}

export function transformTrackBy(trackBy: ((index: number, item: unknown) => unknown) | null): (index: number, item: unknown) => unknown {
    if(trackBy) {
       return trackBy;
    }

    return defaultTrackBy;
}

export function coerceBoolean(value: boolean | null, defaultValue?: boolean): boolean {
    return value ?? (!!defaultValue);
}