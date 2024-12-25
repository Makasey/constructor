import { AbstractEditorOperationService, SitePageElementUnion } from "@modules/constructor";
import { AbstractLzStoreService, LzAbstractQuery, LzQueryInjectionTokensMap, LzServiceInjectionTokensMap, LzStateKey } from "@core";
import { Inject, Injectable, Provider, WritableSignal, signal } from "@angular/core";

@Injectable()
export abstract class AbstractDragService<T extends SitePageElementUnion> extends AbstractEditorOperationService {
    protected constructor(
        protected readonly query: LzAbstractQuery<LzStateKey.EDITOR_STATE>,
        protected readonly service: AbstractLzStoreService<LzStateKey.EDITOR_STATE>,
    ) {
        super(query, service);
    }

    public abstract setDraggableItem(element: T): void;

    public abstract getDraggableItem(): T | null;
}

@Injectable()
export class DefaultDragService<T extends SitePageElementUnion> extends AbstractDragService<T> {
    constructor(
        @Inject(LzQueryInjectionTokensMap[LzStateKey.EDITOR_STATE]) protected readonly query: LzAbstractQuery<LzStateKey.EDITOR_STATE>,
        @Inject(LzServiceInjectionTokensMap[LzStateKey.EDITOR_STATE]) protected readonly service: AbstractLzStoreService<LzStateKey.EDITOR_STATE>,
    ) {
        super(query, service);
    }

    private readonly draggableItem: WritableSignal<T | null> = signal(null);

    public setDraggableItem(element: T): void {
        this.draggableItem.set(element);
    }

    public getDraggableItem(): T | null {
        return this.draggableItem();
    }
}

export function provideDragService<T extends SitePageElementUnion>(existing = DefaultDragService<T>): Provider {
    return {
        provide: AbstractDragService,
        useClass: existing,
    };
}
