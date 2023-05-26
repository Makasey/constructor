import { UpdateStateCallback } from "@datorama/akita";

import { LzState } from "./lz.state";

export type CallbackOrPart<T> = UpdateStateCallback<T> | Partial<T>;

export type StateCallbackOrPart<K extends keyof LzState> = CallbackOrPart<LzState[K]>;

export type InitialStateFunctions = Readonly<{
    [K in keyof LzState]: () => LzState[K];
}>;
