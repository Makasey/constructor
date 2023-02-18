import { Injectable } from "@angular/core";
import { LzState, lzInitialStateFunctions } from "./lz.state";
import { LzStore } from "./lz.store";
import { StateCallbackOrPart } from "./types";
import { UIDataState } from "./states/ui-states";
import { UpdateStateCallback, isFunction } from "@datorama/akita";

@Injectable()
export class LzService {
    constructor(private store: LzStore) {}

    public updateState(updateStateCallback: UpdateStateCallback<LzState>): void {
        this.store.update(state => {
            return {
                ...updateStateCallback(state),
            };
        });
    }

    public updateStatePart<K extends keyof LzState>(stateKey: K, callbackOrPart: StateCallbackOrPart<K>): void {
        this.store.update(state => {
            return {
                [stateKey]: {
                    ...state[stateKey],
                    ...(isFunction(callbackOrPart) ? callbackOrPart(state[stateKey]) : callbackOrPart),
                },
            };
        });
    }

    public updateDataState<K extends keyof LzState>(stateKey: K, dataState: UIDataState): void {
        this.store.update(state => {
            return {
                [stateKey]: {
                    ...state[stateKey],
                    dataState: dataState,
                },
            };
        });
    }

    public reInitiateStatePart<K extends keyof LzState>(stateKey: K): void {
        this.store.update(_ => {
            return {
                [stateKey]: lzInitialStateFunctions[stateKey] && lzInitialStateFunctions[stateKey](),
            };
        });
    }
}
