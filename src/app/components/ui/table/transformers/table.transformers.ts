import { defaultTrackBy } from "../constants";
import { TrackByFn } from "../interfaces";


export function coerceNullableArray<T>(items: T[] | null): T[] {
    return items ?? [];
}

export function coerceNullableObject<T>(object: T | null): T {
    return object ?? {} as T;
}

export function transformTrackBy(trackBy: TrackByFn | null): TrackByFn {
    if(trackBy) {
       return trackBy;
    }

    return defaultTrackBy;
}

export function coerceBoolean(value: boolean | null, defaultValue?: boolean): boolean {
    return value ?? (!!defaultValue);
}