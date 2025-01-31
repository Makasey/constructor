import {
    AbstractEditorOperationService,
    EDITOR_SELECTED_PAGE,
    LocalStorageService,
    SAVE_SHOW_ELEMENTS_LOCALE_STORAGE_KEY,
    SAVE_UPDATE_ITEMS_LOCALE_STORAGE_KEY,
    SitePageElementUnion,
    deleteElementFromTree,
} from "@modules/constructor";
import { AbstractLzStoreService, LzAbstractQuery, LzQueryInjectionTokensMap, LzServiceInjectionTokensMap, LzStateKey } from "@core";
import { Inject, Injectable, Signal, inject } from "@angular/core";
import { Observable } from "rxjs";
import { duplicateRelatedElements } from "@modules/constructor/utils";
import { getRandomId, getSaveValueFromLocalStorage } from "@shared-utils";
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
    public readonly selectedPage: Signal<string> = inject(EDITOR_SELECTED_PAGE);

    public setSavedElementIntoEditor(elementId: string): void {
        const showItems = this.getItems(SAVE_SHOW_ELEMENTS_LOCALE_STORAGE_KEY);
        const savedItems = this.getItems(SAVE_UPDATE_ITEMS_LOCALE_STORAGE_KEY);
        const showItem = showItems.find(item => item.id === elementId)!;

        const stack = [showItem];
        const parentMap: Record<string, string> = {
            null: this.selectedPage(),
        };
        const result: Record<string, SitePageElementUnion> = {};
        let itemId: string | null = getRandomId();
        const childElementId = itemId;

        logAction(`Set saved element with id: ${childElementId}`);

        while (stack.length) {
            const item = stack.pop()!;
            const parentId = parentMap[item.parentId!];

            if (item?.children?.length) {
                stack.push(...item.children.map(item => savedItems[item]));
            }

            const updatedItem = {
                ...item,
                parentId: parentMap[item.parentId!],
                children: [],
                id: itemId ?? getRandomId(),
            };

            result[updatedItem.id] = updatedItem;

            if (result[parentId]) {
                result[parentId].children.unshift(updatedItem.id);
            }

            parentMap[item.id] = updatedItem.id;

            itemId = null;
        }

        this.service.updateState(state => {
            return {
                items: {
                    ...state.items,
                    ...result,
                    [state.selectedPage]: {
                        ...state.items[state.selectedPage],
                        children: state.items[state.selectedPage].children.concat(childElementId),
                    },
                },
            };
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
        const savedShowElements: SitePageElementUnion[] = this.getStoreElement("savedShowItems");
        const filteredShowElements: SitePageElementUnion[] = savedShowElements.filter(el => el.id !== elementId);
        const savedUpdatedItems: Record<string, SitePageElementUnion> = this.getStoreElement("savedUpdatedItems");
        const filteredSavedUpdatedItems: Record<string, SitePageElementUnion> = deleteElementFromTree(savedUpdatedItems, elementId).items;

        this.service.updateState(state => {
            return {
                ...state,
                savedShowItems: filteredShowElements,
                savedUpdatedItems: filteredSavedUpdatedItems,
            };
        });

        this.setItems(filteredShowElements, SAVE_SHOW_ELEMENTS_LOCALE_STORAGE_KEY);
        this.setItems(filteredSavedUpdatedItems, SAVE_UPDATE_ITEMS_LOCALE_STORAGE_KEY);
    }

    public getSavedElements(): Observable<SitePageElementUnion[]> {
        return this.query.select("savedShowItems") ?? [];
    }

    public saveElement(id: string): void {
        logAction(`Save element ${id} to localStorage`);
        const showItems = this.getItems(SAVE_SHOW_ELEMENTS_LOCALE_STORAGE_KEY);
        const savedItems = this.getItems(SAVE_UPDATE_ITEMS_LOCALE_STORAGE_KEY);
        const isElementExists = showItems.some((item: SitePageElementUnion) => item.id === id);

        if (isElementExists) {
            return;
        }

        const currentEditorItems = this.getCurrentEditorItems();

        const rootTreeElementId = getRandomId();
        const filteredEditorItems = duplicateRelatedElements(currentEditorItems, currentEditorItems[id], null, rootTreeElementId);

        this.setItems([...showItems, filteredEditorItems[rootTreeElementId]], SAVE_SHOW_ELEMENTS_LOCALE_STORAGE_KEY);
        this.setItems({ ...savedItems, ...filteredEditorItems }, SAVE_UPDATE_ITEMS_LOCALE_STORAGE_KEY);
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
            return getSaveValueFromLocalStorage(itemsString) ?? ({} as Record<string, SitePageElementUnion>);
        }

        return getSaveValueFromLocalStorage(itemsString) ?? [];
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
