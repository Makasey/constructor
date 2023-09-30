import { AbstractLzStoreService, LzAbstractQuery, LzQueryInjectionTokensMap, LzServiceInjectionTokensMap, LzState, LzStateKey, Page } from "@core";
import { Inject, Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import {
    ROOT_ELEMENT_ID,
    SitePageElement,
    SitePageElementType,
    SitePageElementUnion,
    defaultPageElementSettingsMap,
    deleteElementFromTree,
} from "@modules/constructor";
import { arrayAdd, arrayRemove, logAction } from "@datorama/akita";

@Injectable()
export abstract class AbstractEditorElementActionsService<T extends SitePageElementUnion> {
    protected constructor(
        protected query: LzAbstractQuery<LzStateKey.EDITOR_STATE>,
        protected service: AbstractLzStoreService<LzStateKey.EDITOR_STATE>,
    ) {}

    public selectElement(id: number): Observable<T> {
        return this.query.select(state => state.items[id] as T);
    }

    public selectPageElements(): Observable<number[]> {
        return this.query
            .select(state => {
                return {
                    selectedPage: state.selectedPage,
                    pages: state.pages,
                };
            })
            .pipe(
                map(({ selectedPage, pages }) => {
                    const page = pages.find(page => page.id === selectedPage);

                    return page?.children ?? [];
                }),
            );
    }

    public getElement(id: number): T {
        return this.getStoreElement("items")[id] as T;
    }

    public addPageElement(type: SitePageElementType): void {
        this.service.updateState(state => {
            const newElementID = this.getStoreElement("currentStateIndex") + 1;
            const items = state.items;
            logAction(`Add element to page with id: ${newElementID}`);

            const newElement: SitePageElement = {
                ...defaultPageElementSettingsMap[type],
                id: newElementID,
                parentId: ROOT_ELEMENT_ID,
                settings: {
                    ...defaultPageElementSettingsMap[type].settings,
                },
            };

            const updatedPages = state.pages.map(page => {
                if (page.id === state.selectedPage) {
                    return {
                        ...page,
                        children: arrayAdd(page.children, newElementID),
                    };
                }

                return page;
            });

            return {
                currentStateIndex: state.currentStateIndex > newElementID ? state.currentStateIndex : newElementID,
                selectedElement: newElementID,
                pages: updatedPages,
                items: {
                    ...items,
                    [newElementID]: newElement,
                },
            };
        });
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
            let updatedPages = state.pages;

            const { parentId } = items[elementId];

            if (!parentId) {
                return state;
            }

            if (parentId === ROOT_ELEMENT_ID) {
                updatedPages = this.deleteItemFromPage(elementId);
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
                pages: updatedPages,
                selectedElement: state.selectedElement === elementId ? parentId : ROOT_ELEMENT_ID,
            };
        });
    }

    protected deleteItemFromPage(elementId: number): Page[] {
        const state = this.query.getValue();
        const { pages, selectedPage } = state;

        return pages.map(page => {
            if (page.id === selectedPage) {
                return {
                    ...page,
                    children: arrayRemove(page.children, elementId),
                };
            }

            return page;
        });
    }

    protected getStoreElement<T extends keyof LzState[LzStateKey.EDITOR_STATE]>(key: T): LzState[LzStateKey.EDITOR_STATE][T] {
        return this.query.getValue()[key];
    }
}

@Injectable()
export class DefaultEditorElementActionsService<T extends SitePageElementUnion> extends AbstractEditorElementActionsService<T> {
    constructor(
        @Inject(LzQueryInjectionTokensMap[LzStateKey.EDITOR_STATE]) protected readonly query: LzAbstractQuery<LzStateKey.EDITOR_STATE>,
        @Inject(LzServiceInjectionTokensMap[LzStateKey.EDITOR_STATE]) protected readonly service: AbstractLzStoreService<LzStateKey.EDITOR_STATE>,
    ) {
        super(query, service);
    }
}
