import { AbstractLzStoreService } from "@core/store/abstract/lz-abstract.service";
import { Injectable } from "@angular/core";
import { LzAbstractQuery } from "@core/store/abstract/lz-abstract.query";
import { LzState, LzStateKey } from "@core/store/lz.state";
import { Observable } from "rxjs";
import {
    ROOT_ELEMENT_ID,
    SitePageElement,
    SitePageElementType,
    defaultPageElementSettingsMap,
    deleteElementFromTree,
} from "@modules/constructor/components/edit-area/types";
import { arrayAdd, arrayRemove, logAction } from "@datorama/akita";

@Injectable()
export abstract class AbstractEditorElementService<T extends SitePageElement> {
    protected constructor(
        protected query: LzAbstractQuery<LzStateKey.EDITOR_STATE>,
        protected service: AbstractLzStoreService<LzStateKey.EDITOR_STATE>,
    ) {}

    public selectElement(id: number): Observable<T> {
        return this.query.select(state => state.items[id] as T);
    }

    public getElement(id: number): T {
        return this.getStoreElement("items")[id] as T;
    }

    public addElement(type: SitePageElementType, parentId?: number): void {
        this.service.updateState(state => {
            const newElementID = this.getStoreElement("currentStateIndex") + 1;
            parentId = parentId ?? state.selectedElement;

            logAction(`Add element with id: ${newElementID}`);
            const items = state.items;
            const parentElement = items[parentId];
            const newElement: SitePageElement = {
                ...defaultPageElementSettingsMap[type],
                id: newElementID,
                parentId: parentId,
                settings: {
                    ...defaultPageElementSettingsMap[type].settings,
                },
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

    public deleteElement(elementId: number): void {
        logAction(`Delete element with id: ${elementId}`, [], { id: elementId });

        this.service.updateState(state => {
            let items = { ...state.items };
            const { parentId } = items[elementId];

            if (!parentId) {
                return state;
            }

            const parentElement = items[parentId];

            items = deleteElementFromTree(state.items, elementId);

            return {
                currentStateIndex: state.currentStateIndex === elementId ? elementId - 1 : state.currentStateIndex,
                items: {
                    ...items,
                    [parentId]: {
                        ...parentElement,
                        children: arrayRemove<number[], number>(parentElement.children, item => item === elementId),
                    },
                },
                selectedElement: state.selectedElement === elementId ? parentId : ROOT_ELEMENT_ID,
            };
        });
    }

    protected getStoreElement<T extends keyof LzState[LzStateKey.EDITOR_STATE]>(key: T): LzState[LzStateKey.EDITOR_STATE][T] {
        return this.query.getValue()[key];
    }
}
