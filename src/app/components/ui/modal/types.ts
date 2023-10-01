import { ComponentRef, EmbeddedViewRef, InjectionToken, Injector, TemplateRef, Type, ViewContainerRef } from "@angular/core";
import { FormControl } from "@angular/forms";

import { Observable } from "rxjs";

import { APFormControl, APFormOptions } from "../form";
import { ModalComponent } from "@components";

export interface ModalWithData<T> {
    data: T;
}

export type ModalModel = Readonly<{
    modalWrapperRef: ComponentRef<ModalComponent>;
    contentRef: ComponentRef<unknown> | EmbeddedViewRef<unknown>;
    controlsRef: ComponentRef<unknown> | EmbeddedViewRef<unknown>;
    onClose: Observable<unknown>;
    id: string;
}>;

export type ModalModelMap = Record<string, ModalModel>;

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
    injector?: Injector;
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

export const MODAL_ID_TOKEN = new InjectionToken<string>("Modal id injection token");
