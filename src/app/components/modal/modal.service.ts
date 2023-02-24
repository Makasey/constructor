import {
    ApplicationRef,
    ComponentRef,
    EmbeddedViewRef,
    Inject,
    Injectable,
    Injector,
    Renderer2,
    RendererFactory2,
    TemplateRef,
    Type,
} from "@angular/core";
import { DOCUMENT } from "@angular/common";

import { Subscription, tap } from "rxjs";

import { DEFAULT_MODAL_CONFIG, ModalConfig, ModalType, ModalWithData } from "./types";
import { ModalComponent } from "./modal.component";

const NO_SCROLL_CLASS = "html-no-scroll";

@Injectable({
    providedIn: "root",
})
export class ModalService {
    private modalMap: Record<
        string,
        {
            modalWrapperRef: ComponentRef<ModalComponent>;
            contentRef: ComponentRef<unknown> | EmbeddedViewRef<unknown>;
            controlsRef: ComponentRef<unknown> | EmbeddedViewRef<unknown>;
            closeSubscription: Subscription;
        }
    > = {};

    private renderer: Renderer2;

    constructor(private appRef: ApplicationRef, @Inject(DOCUMENT) public documentRef: Document, private rendererFactory: RendererFactory2) {
        this.renderer = rendererFactory.createRenderer(appRef, null);
    }

    public openModal<T>(model: ModalConfig<T>): string {
        const { viewContainerRef, id } = model;

        viewContainerRef.clear();
        const modalWrapperRef = viewContainerRef.createComponent(ModalComponent);
        const modalId = id ?? crypto.randomUUID();

        this.generateContent(model, modalId, modalWrapperRef);
        this.generateControls(model, modalId, modalWrapperRef);

        this.renderer.addClass(this.documentRef.documentElement, NO_SCROLL_CLASS);

        modalWrapperRef.instance.config = Object.assign({ ...DEFAULT_MODAL_CONFIG }, { ...model });

        this.modalMap = {
            ...this.modalMap,
            [modalId]: {
                ...this.modalMap[modalId],
                modalWrapperRef: modalWrapperRef,
            },
        };

        this.modalMap[modalId].closeSubscription = modalWrapperRef.instance.closeSubject$
        .asObservable()
        .pipe(tap(() => this.closeModal(modalId)))
        .subscribe(console.log);

        return modalId;
    }

    public closeModal(id: string): void {
        const item = this.modalMap[id];

        if (!item) return;

        if (!(Object.keys(this.modalMap).length - 1)) {
            const documentRef = this.documentRef.documentElement;

            this.renderer.removeClass(documentRef, NO_SCROLL_CLASS);
        }

        item.closeSubscription.unsubscribe();

        item.modalWrapperRef.destroy();

        delete this.modalMap[id];
    }

    public closeAllModals(): void {
        Object.values(this.modalMap).forEach((modal, index) => {
            if (!index) {
                const documentRef = this.documentRef.documentElement;

                this.renderer.removeClass(documentRef, NO_SCROLL_CLASS);
            }
            modal.closeSubscription.unsubscribe();
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
                            provide: "data2",
                            useValue: data,
                        },
                    ],
                });

                const contentRef = componentRef.instance.hostView.viewContainerRef.createComponent(model.component as Type<unknown>, {
                    injector: updatedInjector,
                });

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
