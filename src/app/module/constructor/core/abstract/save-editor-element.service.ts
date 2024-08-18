import {
    AbstractEditorOperationService,
    LocalStorageService,
    SAVE_ELEMENTS_LOCALE_STORAGE_KEY,
    SitePageElementUnion,
    processDuplicateElementsById,
} from "@modules/constructor";
import { AbstractLzStoreService, LzAbstractQuery, LzQueryInjectionTokensMap, LzServiceInjectionTokensMap, LzStateKey } from "@core";
import { Inject, Injectable, inject } from "@angular/core";
import { Observable, interval, tap } from "rxjs";
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
                const savedElements = this.getItems();

                if (savedElements.length < 1) {
                    return;
                }

                const currentElements = this.getStoreElement("items");
                const data = savedElements.map(element => {
                    if (currentElements[element.id]) {
                        return currentElements[element.id];
                    }

                    return element;
                });

                this.setItems(data);
                this.setSaveElementsToState();
            }),
        );
    }

    public setSavedElementIntoEditor(elementId: string): void {
        logAction(`Set saved element with id: ${elementId}`);
        this.service.updateState(state => {
            return processDuplicateElementsById(state, elementId);
        });
    }

    public setSaveElementsToState(): void {
        logAction(`Set save elements from locale storage to store`);
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
        this.setSaveElementsToState();
    }

    public getItems(): SitePageElementUnion[] {
        const sectionsString = this.localStorageService.getItem(SAVE_ELEMENTS_LOCALE_STORAGE_KEY);
        return sectionsString ? JSON.parse(sectionsString) : [];
    }

    public setItems(sections: SitePageElementUnion[]): void {
        this.localStorageService.setItem(SAVE_ELEMENTS_LOCALE_STORAGE_KEY, JSON.stringify(sections));
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
