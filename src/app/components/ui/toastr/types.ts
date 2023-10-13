import { InjectionToken, TemplateRef, Type } from "@angular/core";

import { ActiveState, EntityState, ID } from "@datorama/akita";

import { UIState } from "app/types/common/common";

export const LOCAL_STORAGE_ENABLED_TOASTR_DND_MODE = "enableDNDMode";

export const EXISTING_TIME_TOKEN = new InjectionToken<number>("toastr-item EXISTING_TIME", {
    factory(): number {
        return 5000;
    },
});

export const TOASTR_ITEM_OPTIONS_TOKEN = new InjectionToken<Record<string, unknown>>("TOASTR_ITEM_OPTIONS_TOKEN", {
    factory(): Record<string, unknown> {
        return {};
    },
});

export const DISAPPEARING_TIME_TOKEN = new InjectionToken<number>("toastr-item DISAPPEARING_TIME", {
    factory(): number {
        return 2000;
    },
});

export enum LZToastrItemType {
    INFO = "info",
    WARNING = "warning",
    ERROR = "error",
    SUCCESS = "success",
    DEFAULT = "default",
}

export type LZToastrItemUIState = Readonly<{
    alwaysOnDisplay: boolean;
    enableDNDMode: boolean;
}>;

export interface LZToastrItemState extends EntityState<LZToastrItem>, ActiveState, UIState<LZToastrItemUIState> {}

export type LZToastrItem = Readonly<{
    id?: ID;
    order?: number;
    title: string;
    text?: string;
    type: LZToastrItemType;
    template?: TemplateRef<unknown> | LZToastrItemComponentType;
    context?: unknown;
    customColor?: string;
    visibility?: boolean;
}>;

export type LZToastrItemComponentType = {
    component: Type<unknown>;
    options?: Record<string, unknown>;
};

export function getInitialToastrItemState(state: Partial<LZToastrItemState>): LZToastrItemState {
    return {
        active: null,
        ui: {
            alwaysOnDisplay: false,
            enableDNDMode: false,
            ...state,
        },
    };
}
