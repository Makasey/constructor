import { AbstractEditorOperationService } from "@modules/constructor";
import { AbstractLzStoreService, LzAbstractQuery, LzQueryInjectionTokensMap, LzServiceInjectionTokensMap, LzStateKey } from "@core";
import { Inject, Injectable, Provider, Signal, WritableSignal, computed, signal } from "@angular/core";

@Injectable()
export abstract class AbstractDragService<T> extends AbstractEditorOperationService {
    protected constructor(
        protected readonly query: LzAbstractQuery<LzStateKey.EDITOR_STATE>,
        protected readonly service: AbstractLzStoreService<LzStateKey.EDITOR_STATE>,
    ) {
        super(query, service);
    }

    public abstract setDraggableItem(element: T | null): void;

    public abstract getDraggableItem(): T | null;

    public abstract addConnectedElement(element: string): void;

    public abstract getConnectedDropListsId(): Signal<string[]>;

    public abstract removeConnectedList(id: string): void;
}

@Injectable()
export class DefaultDragService<T> extends AbstractDragService<T> {
    constructor(
        @Inject(LzQueryInjectionTokensMap[LzStateKey.EDITOR_STATE]) protected readonly query: LzAbstractQuery<LzStateKey.EDITOR_STATE>,
        @Inject(LzServiceInjectionTokensMap[LzStateKey.EDITOR_STATE]) protected readonly service: AbstractLzStoreService<LzStateKey.EDITOR_STATE>,
    ) {
        super(query, service);
    }

    private readonly draggableItem: WritableSignal<T | null> = signal(null);

    private readonly connectedDropListsIds: WritableSignal<string[]> = signal(["elements", "root-element"]);

    public setDraggableItem(element: T): void {
        this.draggableItem.set(element);
    }

    public getDraggableItem(): T | null {
        return this.draggableItem();
    }

    public addConnectedElement(element: string): void {
        this.connectedDropListsIds.update(value => value.concat(element));
    }

    public removeConnectedList(id: string): void {
        this.connectedDropListsIds.update(value => value.filter(connectedId => connectedId !== id));
    }

    public getConnectedDropListsId(): Signal<string[]> {
        return computed(() => this.connectedDropListsIds());
    }
}

export function provideDragService<T>(existing = DefaultDragService<T>): Provider {
    return {
        provide: AbstractDragService,
        useClass: existing,
    };
}
