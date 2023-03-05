import { APFormControl, APFormOptions } from "../form";
import { FormControl } from "@angular/forms";
import { InjectionToken, TemplateRef, Type, ViewContainerRef } from "@angular/core";
import { Observable } from "rxjs";

export interface ModalWithData<T> {
    data: T;
}

export enum ModalType {
    DEFAULT = "default",
    COMPONENT = "component",
    TEMPLATE = "template",
}

type ModalControls = TemplateRef<unknown> | ModalDefaultControl;

export type ModalDefaultControl = Readonly<{
    confirmBtnName?: string;
    confirmBtnDisabled?: Observable<boolean>;
    onConfirm: () => void;
    cancelBtnName?: string;
    onClose?: () => void;
}>;

export type ModalConfig<T = unknown, U = unknown> = Readonly<{
    data?: T extends ModalWithData<infer E> ? E : never;
    component?: Type<T>;
    closable?: boolean;
    closeOnOutsideClick?: boolean;
    closeOnEsc?: boolean;
    title?: string;
    innerText?: string;
    innerTemplate?: TemplateRef<unknown>;
    headerTemplate?: TemplateRef<unknown>;
    viewContainerRef: ViewContainerRef;
    controlsTemplate?: TemplateRef<unknown>;
    controls?: ModalControls;
    overlayVisible?: boolean;
    contentType: ModalType;
    customClass?: string;
    context?: U;
    id: string;
}>;

export const DEFAULT_MODAL_CONFIG: ModalConfig = {
    contentType: ModalType.DEFAULT,
    viewContainerRef: null!,
    title: "My awesome modal",
    closable: false,
    overlayVisible: true,
    closeOnOutsideClick: false,
    component: null!,
    closeOnEsc: false,
    context: null,
    id: "defaultModalId",
};

export type ControlTemplate = TemplateRef<{
    controlModel: APFormControl;
    formControl: FormControl;
    options: APFormOptions;
}>;

export const MODAL_DATA_TOKEN = new InjectionToken<unknown>("Modal data injection token", {
    factory: () => {
        return {};
    },
});
