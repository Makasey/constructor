import { AbstractLzStoreService, LzAbstractQuery, LzQueryInjectionTokensMap, LzServiceInjectionTokensMap, LzState, LzStateKey, Page } from "@core";
import {
    ElementActionsConfigItem,
    ROOT_ELEMENT_ID,
    SAVE_ELEMENTS_LOCALE_STORAGE_KEY,
    SitePageElement,
    SitePageElementType,
    SitePageElementUnion,
    deleteElementFromTree,
    processCreateElementActions,
    processDuplicateElementsById,
    processElementCreation,
} from "@modules/constructor";
import { Inject, Injectable, inject } from "@angular/core";
import { LocalStorageService } from "@modules/constructor/core";
import { Observable, map } from "rxjs";
import { arrayAdd, arrayRemove, logAction } from "@datorama/akita";

@Injectable()
export abstract class AbstractEditorElementActionsService<T extends SitePageElementUnion> {
    protected constructor(
        protected query: LzAbstractQuery<LzStateKey.EDITOR_STATE>,
        protected service: AbstractLzStoreService<LzStateKey.EDITOR_STATE>,
    ) {}

    public readonly localStorageService = inject(LocalStorageService);

    public selectElement(id: string): Observable<T> {
        return this.query.select(state => state.items[id] as T);
    }

    public selectPageElements(): Observable<string[]> {
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

    public getElement(id: string): T {
        return this.getStoreElement("items")[id] as T;
    }

    public selectItems(): Observable<Record<string, SitePageElement>> {
        return this.query.select(state => state.items);
    }

    public addPageElement(type: SitePageElementType): void {
        this.service.updateState(state => {
            const stateData = processElementCreation(type, state.items, ROOT_ELEMENT_ID);

            const updatedPages = state.pages.map(page => {
                if (page.id === state.selectedPage) {
                    return {
                        ...page,
                        children: arrayAdd(page.children, stateData.selectedElement),
                    };
                }

                return page;
            });

            return {
                ...stateData,
                pages: updatedPages,
            };
        });
    }

    public addElementByType(type: SitePageElementType, parentId?: string): void {
        this.service.updateState(state => {
            parentId = parentId ?? state.selectedElement;

            return processElementCreation(type, state.items, parentId);
        });
    }

    public addElement(element: SitePageElementUnion, parentId?: string): void {
        this.service.updateState(state => {
            parentId = parentId ?? state.selectedElement;
            const { type, id: elementID } = element;

            logAction(`Add element with id: ${elementID} type: ${type}`);
            const items = state.items;
            const parentElement = items[parentId];

            return {
                selectedElement: elementID,
                items: {
                    ...items,
                    [parentId]: {
                        ...parentElement,
                        children: arrayAdd(parentElement.children, elementID),
                    },
                    [elementID]: element,
                },
            };
        });
    }

    public deleteElement(elementId: string): void {
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

            const parentElement: SitePageElementUnion = items[parentId];

            items = deleteElementFromTree(state.items, elementId);

            return {
                items: {
                    ...items,
                    [parentId]: {
                        ...parentElement,
                        children: arrayRemove(parentElement.children, item => item === elementId),
                    },
                },
                pages: updatedPages,
                selectedElement: state.selectedElement === elementId ? parentId : ROOT_ELEMENT_ID,
            };
        });
    }

    public duplicateElementById(id: string): void {
        logAction(`Duplicate element with id: ${id}`);
        this.service.updateState(state => {
            return processDuplicateElementsById(state, id);
        });
    }

    public setSaveElements(): void {
        logAction(`Set save elements`);
        const elements: SitePageElementUnion[] = this.getItems();

        this.service.updateState(state => {
            return {
                ...state,
                savedItems: elements,
            };
        });
    }

    public removeSavedElementById(elementId: string): void {
        const savedElements: SitePageElementUnion[] = this.getStoreElement("savedItems");
        const data: SitePageElementUnion[] = savedElements.filter(el => el.id !== elementId);

        this.service.updateState(state => {
            return {
                ...state,
                savedItems: data,
            };
        });

        this.setItems(data);
    }

    public getSavedElements(): Observable<SitePageElementUnion[]> {
        return this.query.select("savedItems") ?? [];
    }

    public saveElement(id: string): void {
        logAction(`Save element ${id} to localStorage`);
        const sections = this.getItems();
        const element = this.getElement(id);

        if (sections.some((section: SitePageElementUnion) => section.id === id)) {
            return;
        }

        this.setItems([...sections, element]);
    }

    public getItems(): SitePageElementUnion[] {
        const sectionsString = this.localStorageService.getItem(SAVE_ELEMENTS_LOCALE_STORAGE_KEY);
        return sectionsString ? JSON.parse(sectionsString) : [];
    }

    public setItems(sections: SitePageElementUnion[]): void {
        this.localStorageService.setItem(SAVE_ELEMENTS_LOCALE_STORAGE_KEY, JSON.stringify(sections));
    }

    public processElementActions(elementId: string): ElementActionsConfigItem[] {
        logAction(`Process create  element actions with id: ${elementId}`);
        const { type } = this.getStoreElement("items")[elementId];
        return processCreateElementActions(type);
    }

    protected deleteItemFromPage(elementId: string): Page[] {
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
