import { InitialStateFunctions } from "./types";
import {RootModuleState} from "./states/ui-states";
import {initialRootModuleState} from "./initial-states/initial-states.type";

export enum LzStateKey {
    ROOT_STATE = "rootState",
}

export type LzState = Readonly<{
    [LzStateKey.ROOT_STATE]: RootModuleState;
}>;

export const lzInitialStateFunctions: InitialStateFunctions = {
    [LzStateKey.ROOT_STATE]: initialRootModuleState,
};

export function createLZInitialState(): LzState {
    return Object.keys(lzInitialStateFunctions).reduce((result, next) => {
        return {
            ...result,
            [next]: lzInitialStateFunctions[next] && lzInitialStateFunctions[next](),
        };
    }, {}) as LzState;
}
