import { TrackByFn } from "../interfaces";
import { defaultTrackBy } from "../constants";

export function coerceNullableArray<T>(value: T[] | null): T[] {
    return value ?? [];
}

export function coerceNullableObject<T>(value: T | null): T {
    return value ?? ({} as T);
}

export function transformTrackBy(value: TrackByFn | null): TrackByFn {
    if (value) {
        return value;
    }

    return defaultTrackBy;
}

export function coerceBoolean(value: boolean | null): boolean {
    return value ?? false;
}
