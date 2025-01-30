import {
    AbstractEditorOperationService,
    LocalStorageService,
    SAVE_SHOW_ELEMENTS_LOCALE_STORAGE_KEY,
    SAVE_UPDATE_ITEMS_LOCALE_STORAGE_KEY,
    SitePageElementUnion,
    processDuplicateElementsById,
} from "@modules/constructor";
import { AbstractLzStoreService, LzAbstractQuery, LzQueryInjectionTokensMap, LzServiceInjectionTokensMap, LzStateKey } from "@core";
import { Inject, Injectable, inject } from "@angular/core";
import { Observable, interval, tap } from "rxjs";
import { duplicateRelatedElements } from "@modules/constructor/utils";
import { logAction } from "@datorama/akita";

@Injectable()
export abstract class AbstractSaveEditorElementsService extends AbstractEditorOperationService {
    protected constructor(
        protected query: LzAbstractQuery<LzStateKey.EDITOR_STATE>,
        protected service: AbstractLzStoreService<LzStateKey.EDITOR_STATE>,
    ) {
        super(query, service);
    }

    public readonly localStorageService = inject(LocalStorageService);

    public autoSaveElementsInLocaleStorage(): Observable<number> {
        logAction(`Auto save elements in locale storage`);
        return interval(20000).pipe(
            tap(() => {
                const savedElements = this.getItems(SAVE_SHOW_ELEMENTS_LOCALE_STORAGE_KEY);

                if (!savedElements.length) {
                    return;
                }

                const currentElements = this.getStoreElement("items");
                const data = savedElements.map(element => {
                    if (currentElements[element.id]) {
                        return currentElements[element.id];
                    }

                    return element;
                });

                this.setItems(data, SAVE_SHOW_ELEMENTS_LOCALE_STORAGE_KEY);
                this.setShowElementsToState();
            }),
        );
    }

    public setSavedElementIntoEditor(elementId: string): void {
        logAction(`Set saved element with id: ${elementId}`);
        this.service.updateState(state => {
            return processDuplicateElementsById(state, elementId);
        });
    }

    public setShowElementsToState(): void {
        logAction(`Set show elements from locale storage to store`);
        const elements: SitePageElementUnion[] = this.getItems(SAVE_SHOW_ELEMENTS_LOCALE_STORAGE_KEY);

        this.service.updateState(state => {
            return {
                ...state,
                savedShowItems: elements,
            };
        });
    }

    public setSavedElementsToState(): void {
        logAction(`Set save elements from locale storage to store`);

        const elements = this.getItems(SAVE_UPDATE_ITEMS_LOCALE_STORAGE_KEY);

        this.service.updateState(state => {
            return {
                ...state,
                savedUpdatedItems: elements,
            };
        });
    }

    public removeSavedElementById(elementId: string): void {
        const savedElements: SitePageElementUnion[] = this.getStoreElement("savedShowItems");
        const data: SitePageElementUnion[] = savedElements.filter(el => el.id !== elementId);

        this.service.updateState(state => {
            return {
                ...state,
                savedShowItems: data,
            };
        });

        this.setItems(data, SAVE_SHOW_ELEMENTS_LOCALE_STORAGE_KEY);
    }

    public getSavedElements(): Observable<SitePageElementUnion[]> {
        return this.query.select("savedShowItems") ?? [];
    }

    public saveElement(id: string): void {
        logAction(`Save element ${id} to localStorage`);
        const showItems = this.getItems(SAVE_SHOW_ELEMENTS_LOCALE_STORAGE_KEY);
        const savedItems = this.getItems(SAVE_UPDATE_ITEMS_LOCALE_STORAGE_KEY);
        const element = this.getElement(id);
        const isElementExists = showItems.some((item: SitePageElementUnion) => item.id === id);

        if (isElementExists) {
            return;
        }

        const currentEditorItems = this.getCurrentEditorItems();

        const filteredEditorItems = duplicateRelatedElements(currentEditorItems, currentEditorItems[id]);

        this.setItems([...showItems, element], SAVE_SHOW_ELEMENTS_LOCALE_STORAGE_KEY);
        this.setItems({ ...savedItems, filteredEditorItems }, SAVE_UPDATE_ITEMS_LOCALE_STORAGE_KEY);
        this.setShowElementsToState();
        this.setSavedElementsToState();
    }

    public getCurrentEditorItems(): Record<string, SitePageElementUnion> {
        return this.getStoreElement("items");
    }

    public clearSaveElements(): void {
        this.localStorageService.removeItem(SAVE_SHOW_ELEMENTS_LOCALE_STORAGE_KEY);
        this.localStorageService.removeItem(SAVE_UPDATE_ITEMS_LOCALE_STORAGE_KEY);
    }

    public getItems(key: "savedUpdateItems"): Record<string, SitePageElementUnion>;
    public getItems(key: "showSavedItems"): SitePageElementUnion[];
    public getItems(key: "savedUpdateItems" | "showSavedItems"): SitePageElementUnion[] | Record<string, SitePageElementUnion> {
        const itemsString = this.localStorageService.getItem(key);
        if (key === "savedUpdateItems") {
            return itemsString ? JSON.parse(itemsString) : ({} as Record<string, SitePageElementUnion>);
        }

        return itemsString ? JSON.parse(itemsString) : [];
    }

    public setItems(items: unknown, key: string): void {
        this.localStorageService.setItem(key, JSON.stringify(items));
    }
}

@Injectable()
export class SaveEditorElementsService extends AbstractSaveEditorElementsService {
    constructor(
        @Inject(LzQueryInjectionTokensMap[LzStateKey.EDITOR_STATE]) protected readonly query: LzAbstractQuery<LzStateKey.EDITOR_STATE>,
        @Inject(LzServiceInjectionTokensMap[LzStateKey.EDITOR_STATE]) protected readonly service: AbstractLzStoreService<LzStateKey.EDITOR_STATE>,
    ) {
        super(query, service);
    }
}
