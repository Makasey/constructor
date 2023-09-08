import { LzState, UIDataStateful } from "@core/store";
import { UpdateStateCallback } from "@datorama/akita";

export type CallbackOrPart<T> = UpdateStateCallback<T> | Partial<T>;

export type StateCallbackOrPart<K extends keyof LzState> = CallbackOrPart<LzState[K]>;

export type InitialStateFunctions = Readonly<{
    [K in keyof LzState]: () => LzState[K];
}>;

export function isUIDateStateful(object: Record<string, unknown>): object is UIDataStateful {
    return Object.prototype.hasOwnProperty.call(object, "dataState");
}
