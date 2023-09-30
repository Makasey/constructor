import { LzState } from "@core";
import { Store } from "@datorama/akita";

export abstract class LzAbstractStore<T extends keyof LzState> extends Store<LzState[T]> {}
