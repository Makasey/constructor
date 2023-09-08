import { UpdateStateCallback } from "@datorama/akita";

import { LzAbstractStore, LzState, UIDataState, isUIDateStateful, lzInitialStateFunctions } from "@core/store";

export abstract class AbstractLzStoreService<T extends keyof LzState> {
    public abstract updateState(updateStateCallback: UpdateStateCallback<LzState[T], Partial<LzState[T]>>): void;

    public abstract updateStatePart(statePart: Partial<LzState[T]>): void;

    public abstract updateDataState(dataState: UIDataState): void;

    public abstract reInitiateState(stateKey: string): void;
}

export class LzStoreService<T extends keyof LzState> extends AbstractLzStoreService<T> {
    constructor(private readonly store: LzAbstractStore<T>) {
        super();
    }

    public reInitiateState(stateKey: T): void {
        this.store.update(() => lzInitialStateFunctions[stateKey]());
    }

    public updateDataState(dataState: UIDataState): void {
        this.updateState(state => {
            return isUIDateStateful(state)
                ? {
                      ...state,
                      dataState: dataState,
                  }
                : {};
        });
    }

    public updateState(updateStateCallback: UpdateStateCallback<LzState[T], Partial<LzState[T]>>): void {
        this.store.update((state: LzState[T]) => {
            return {
                ...state,
                ...updateStateCallback(state),
            };
        });
    }

    public updateStatePart(statePart: Partial<LzState[T]>): void {
        this.store.update(() => {
            return {
                ...statePart,
            };
        });
    }
}
