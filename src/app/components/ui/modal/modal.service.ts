import { ApplicationRef, ComponentRef, Injectable, Injector, Renderer2, RendererFactory2, TemplateRef, Type, inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";

import { finalize } from "rxjs";

import {
    DEFAULT_MODAL_CONFIG,
    MODAL_DATA_TOKEN,
    MODAL_ID_TOKEN,
    ModalComponent,
    ModalConfig,
    ModalModel,
    ModalModelMap,
    ModalType,
    ModalWithData,
} from "@components";
import { getRandomId } from "@shared-utils";

const NO_SCROLL_CLASS = "html-no-scroll";

@Injectable({
    providedIn: "root",
})
export class ModalService {
    private readonly appRef = inject(ApplicationRef);

    private readonly documentRef = inject(DOCUMENT);

    private readonly rendererFactory = inject(RendererFactory2);

    private modalMap: ModalModelMap = {};

    private renderer: Renderer2 = this.rendererFactory.createRenderer(this.appRef, null);

    public openModal<T>(model: ModalConfig<T>): ModalModel {
        const { viewContainerRef, id } = model;

        viewContainerRef.clear();
        const modalWrapperRef = viewContainerRef.createComponent(ModalComponent);
        const modalId = id ?? getRandomId();

        this.renderer.addClass(this.documentRef.documentElement, NO_SCROLL_CLASS);

        modalWrapperRef.instance.config = Object.assign({ ...DEFAULT_MODAL_CONFIG }, { ...model });

        this.generateContent(model, modalId, modalWrapperRef);
        this.generateControls(model, modalId, modalWrapperRef);

        this.modalMap = {
            ...this.modalMap,
            [modalId]: {
                ...this.modalMap[modalId],
                id: modalId,
                modalWrapperRef: modalWrapperRef,
            },
        };

        const closeStream = modalWrapperRef.instance.closeSubject$.asObservable().pipe(finalize(() => this.closeModal(modalId)));

        this.modalMap = {
            ...this.modalMap,
            [modalId]: {
                ...this.modalMap[modalId],
                onClose: closeStream,
            },
        };

        return this.modalMap[modalId];
    }

    public closeModal(id: string, value?: unknown): void {
        const item = this.modalMap[id];

        if (!item) return;

        if (!(Object.keys(this.modalMap).length - 1)) {
            const documentRef = this.documentRef.documentElement;

            this.renderer.removeClass(documentRef, NO_SCROLL_CLASS);
        }

        item.modalWrapperRef.instance.closeSubject$.next(value);
        item.modalWrapperRef.instance.closeSubject$.complete();

        item.modalWrapperRef.destroy();

        delete this.modalMap[id];
    }

    public closeAllModals(): void {
        Object.values(this.modalMap).forEach((modal, index) => {
            if (!index) {
                const documentRef = this.documentRef.documentElement;

                this.renderer.removeClass(documentRef, NO_SCROLL_CLASS);
            }

            modal.modalWrapperRef.instance.closeSubject$.complete();
            modal.modalWrapperRef.destroy();
        });

        this.modalMap = {};
    }

    private generateContent<T>(model: ModalConfig<T>, id: string, componentRef: ComponentRef<ModalComponent>): void {
        const { innerTemplate, contentType, innerText, context, data } = model;

        switch (contentType) {
            case ModalType.TEMPLATE: {
                const item = this.modalMap[id];
                const contentRef = componentRef.instance.hostView.viewContainerRef.createEmbeddedView(innerTemplate as TemplateRef<unknown>, context);

                this.modalMap = {
                    ...this.modalMap,
                    [id]: {
                        ...item,
                        contentRef: contentRef,
                    },
                };

                break;
            }

            case ModalType.COMPONENT: {
                const item = this.modalMap[id];
                const updatedInjector = Injector.create({
                    providers: [
                        {
                            provide: MODAL_DATA_TOKEN,
                            useValue: data,
                        },
                        {
                            provide: MODAL_ID_TOKEN,
                            useValue: id,
                        },
                    ],
                });

                const contentRef = componentRef.instance.hostView.viewContainerRef.createComponent(model.component as Type<unknown>, {
                    injector: updatedInjector,
                });
                // TODO: Remove mutation of component instance
                if (data) {
                    (contentRef.instance as ModalWithData<unknown>).data = data;
                }

                this.modalMap = {
                    ...this.modalMap,
                    [id]: {
                        ...item,
                        contentRef: contentRef,
                    },
                };

                break;
            }

            default: {
                componentRef.instance.text = innerText as string;

                const item = this.modalMap[id];

                const contentRef = componentRef.instance.hostView.viewContainerRef.createEmbeddedView(componentRef.instance.defaultContent);

                this.modalMap = {
                    ...this.modalMap,
                    [id]: {
                        ...item,
                        contentRef: contentRef,
                    },
                };

                break;
            }
        }
    }

    private generateControls<T>(model: ModalConfig<T>, id: string, componentRef: ComponentRef<ModalComponent>): void {}
}
