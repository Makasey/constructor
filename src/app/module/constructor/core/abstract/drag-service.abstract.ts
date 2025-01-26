import { AbstractEditorOperationService } from "@modules/constructor";
import { AbstractLzStoreService, LzAbstractQuery, LzQueryInjectionTokensMap, LzServiceInjectionTokensMap, LzStateKey } from "@core";
import { Inject, Injectable, Provider, Signal, WritableSignal, computed, signal } from "@angular/core";
import { coerceArray } from "@datorama/akita";

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

    public abstract addConnectedElement(elementOrElements: string | string[]): void;

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

    private readonly connectedDropListsIds: WritableSignal<string[]> = signal(["elements", "rootID"]);

    public setDraggableItem(element: T): void {
        this.draggableItem.set(element);
    }

    public getDraggableItem(): T | null {
        return this.draggableItem();
    }

    public addConnectedElement(elementOrElements: string | string[]): void {
        elementOrElements = coerceArray(elementOrElements);

        this.connectedDropListsIds.update(value => value.concat(elementOrElements));
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
