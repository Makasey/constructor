import { AbstractLzStoreService } from "@core/store/abstract/lz-abstract.service";
import { Inject, Injectable } from "@angular/core";
import { LzAbstractQuery } from "@core/store/abstract/lz-abstract.query";
import { LzQueryInjectionTokensMap, LzServiceInjectionTokensMap } from "@core/store/abstract/types";
import { LzState, LzStateKey } from "@core/store/lz.state";
import { Observable } from "rxjs";
import { SitePageElement, SitePageElementType, defaultPageElementSettingsMap } from "@modules/constructor/components/edit-area/types";
import { arrayAdd, arrayRemove } from "@datorama/akita";

@Injectable()
export abstract class AbstractEditAreaService {
    public abstract selectElement(id: number): Observable<SitePageElement>;

    public abstract getElement(id: number): SitePageElement;

    public abstract addElement(parentId: number, type: SitePageElementType): void;

    public abstract deleteElement(parentId: number, elementId: number): void;

    public abstract updateSelection(elementId: number): void;

    public abstract selectSelectedElement(): Observable<number | null>;
}

@Injectable()
export class DefaultEditAreaService extends AbstractEditAreaService {
    constructor(
        @Inject(LzQueryInjectionTokensMap[LzStateKey.EDITOR_STATE]) private readonly query: LzAbstractQuery<LzStateKey.EDITOR_STATE>,
        @Inject(LzServiceInjectionTokensMap[LzStateKey.EDITOR_STATE]) private readonly service: AbstractLzStoreService<LzStateKey.EDITOR_STATE>,
    ) {
        super();
    }

    public selectElement(id: number): Observable<SitePageElement> {
        return this.query.select(state => state.items[id]);
    }

    public getElement(id: number): SitePageElement {
        return this.query.getValue().items[id];
    }

    public addElement(parentId: number, type: SitePageElementType): void {
        this.service.updateState(state => {
            const newElementID = this.getStoreElement("currentStateIndex") + 1;
            const items = state.items;
            const parentElement = items[parentId];
            const newElement: SitePageElement = {
                id: newElementID,
                ...defaultPageElementSettingsMap[type],
            };

            return {
                currentStateIndex: state.currentStateIndex > newElementID ? state.currentStateIndex : newElementID,
                selectedElement: newElementID,
                items: {
                    ...items,
                    [parentId]: {
                        ...parentElement,
                        children: arrayAdd(parentElement.children, newElementID),
                    },
                    [newElementID]: newElement,
                },
            };
        });
    }

    public deleteElement(parentId: number, elementId: number): void {
        this.service.updateState(state => {
            const items = { ...state.items };
            const parentElement = items[parentId];

            delete items[elementId];

            return {
                currentStateIndex: state.currentStateIndex === elementId ? elementId - 1 : state.currentStateIndex,
                items: {
                    ...items,
                    [parentId]: {
                        ...parentElement,
                        children: arrayRemove<number[], number>(parentElement.children, item => item === elementId),
                    },
                },
                selectedElement: state.selectedElement === elementId ? null : state.selectedElement,
            };
        });
    }

    private getStoreElement<T extends keyof LzState[LzStateKey.EDITOR_STATE]>(key: T): LzState[LzStateKey.EDITOR_STATE][T] {
        return this.query.getValue()[key];
    }

    public updateSelection(elementId: number): void {
        this.service.updateState(state => {
            const shouldDeselectItem = elementId === state.selectedElement;

            return {
                selectedElement: shouldDeselectItem ? null : elementId,
            };
        });
    }

    public selectSelectedElement(): Observable<number | null> {
        return this.query.select(state => state.selectedElement);
    }
}
