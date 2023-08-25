import { APFormDefaultTemplateKeys, APFormModel } from "@components/ui";
import { AbstractLzStoreService } from "@core/store/abstract/lz-abstract.service";
import { Inject, Injectable } from "@angular/core";
import { LzAbstractQuery } from "@core/store/abstract/lz-abstract.query";
import { LzQueryInjectionTokensMap, LzServiceInjectionTokensMap } from "@core/store/abstract/types";
import { LzState, LzStateKey } from "@core/store/lz.state";
import { NgFormsManager } from "@ngneat/forms-manager";
import { Observable, distinctUntilChanged, filter, map, shareReplay, skip, tap } from "rxjs";
import {
    PageSettings,
    ROOT_ELEMENT_ID,
    SitePageElement,
    SitePageElementSettings,
    SitePageElementType,
    defaultPageElementSettingsMap,
    deleteElementFromTree,
    isObjectEquals,
} from "@modules/constructor/components/edit-area/types";
import { arrayAdd, arrayRemove, filterNilValue, logAction } from "@datorama/akita";

@Injectable()
export abstract class AbstractEditAreaService {
    public abstract selectElement(id: number): Observable<SitePageElement>;

    public abstract getElement(id: number): SitePageElement;

    public abstract addElement(type: SitePageElementType, parentId?: number): void;

    public abstract deleteElement(elementId: number): void;

    public abstract updateSelection(elementId: number): void;

    public abstract selectSelectedElement(): Observable<number>;

    public abstract selectFormModel(): Observable<APFormModel>;

    public abstract selectElementSettingsFormModel(): Observable<APFormModel>;

    public abstract selectSettings<K>(id: number): Observable<K>;

    public abstract selectFormModelChange(): Observable<PageSettings>;

    public abstract selectElementSettingsFormModelChange(): Observable<SitePageElementSettings>;

    public abstract tabSelection(currentIndex?: number): void;
}

@Injectable()
export class DefaultEditAreaService extends AbstractEditAreaService {
    constructor(
        @Inject(LzQueryInjectionTokensMap[LzStateKey.EDITOR_STATE]) private readonly query: LzAbstractQuery<LzStateKey.EDITOR_STATE>,
        @Inject(LzServiceInjectionTokensMap[LzStateKey.EDITOR_STATE]) private readonly service: AbstractLzStoreService<LzStateKey.EDITOR_STATE>,
        private readonly formsManager: NgFormsManager,
    ) {
        super();
    }

    public selectElement(id: number): Observable<SitePageElement> {
        return this.query.select(state => state.items[id]);
    }

    public getElement(id: number): SitePageElement {
        return this.getStoreElement("items")[id];
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

    private getStoreElement<T extends keyof LzState[LzStateKey.EDITOR_STATE]>(key: T): LzState[LzStateKey.EDITOR_STATE][T] {
        return this.query.getValue()[key];
    }

    public updateSelection(elementId: number): void {
        this.service.updateState(state => {
            const shouldDeselectItem = elementId === state.selectedElement;
            logAction(`${shouldDeselectItem ? "deselect" : "select"}: ${elementId}`, [elementId]);
            return {
                selectedElement: shouldDeselectItem ? ROOT_ELEMENT_ID : elementId,
            };
        });
    }

    public selectSelectedElement(): Observable<number> {
        return this.query.select(state => state.selectedElement);
    }

    public selectFormModel(): Observable<APFormModel> {
        return this.query
            .select(state => state.settings)
            .pipe(
                map(settings => {
                    const { title, campaignName } = settings;

                    return {
                        id: crypto.randomUUID(),
                        name: "globalSettings",
                        upsertConfig: {
                            debounceTime: 500,
                        },
                        controls: [
                            {
                                id: crypto.randomUUID(),
                                name: "title",
                                valueTemplateKey: APFormDefaultTemplateKeys.TEXT_FIELD,
                                value: title,
                                options: {
                                    label: "Название сайта",
                                    maxLength: 30,
                                },
                            },
                            {
                                id: crypto.randomUUID(),
                                name: "campaignName",
                                valueTemplateKey: APFormDefaultTemplateKeys.TEXT_FIELD,
                                value: campaignName,
                                options: {
                                    maxLength: 30,
                                    label: "Название вашей компании",
                                },
                            },

                            {
                                id: crypto.randomUUID(),
                                name: "siteDescription",
                                valueTemplateKey: APFormDefaultTemplateKeys.TEXTAREA_FIELD,
                                value: settings.siteDescription,
                                options: {
                                    maxLength: 300,
                                    label: "Описание вашей компании",
                                },
                            },

                            {
                                id: crypto.randomUUID(),
                                name: "siteMetaTags",
                                valueTemplateKey: APFormDefaultTemplateKeys.TEXTAREA_FIELD,
                                value: settings.siteMetaTags,
                                options: {
                                    maxLength: 300,
                                    label: "Ключевые слова для вашего сайта",
                                },
                            },
                        ],
                    };
                }),
            );
    }

    public selectFormModelChange(): Observable<PageSettings> {
        return this.formsManager.valueChanges("globalSettings").pipe(
            skip(1),
            distinctUntilChanged((previous, current) => isObjectEquals(previous, current)),
            tap(value => this.updatePageSettings(value)),
        );
    }

    private updatePageSettings(value: PageSettings): void {
        logAction("Update page settings", [], value);

        this.service.updateState(state => {
            return {
                settings: {
                    ...state.settings,
                    ...value,
                },
            };
        });
    }

    public selectSettings<K>(id: number): Observable<K> {
        return this.query.select(state => state.items[id]?.settings as K).pipe(filterNilValue(), shareReplay(1));
    }

    public selectElementSettingsFormModel(): Observable<APFormModel> {
        return this.selectSelectedElement().pipe(
            filter(selectedElement => selectedElement !== ROOT_ELEMENT_ID),
            map(selectedElement => {
                const element = this.getElement(selectedElement);

                return {
                    id: "elementSettings",
                    name: "elementSettings",
                    upsertConfig: {
                        debounceTime: 500,
                    },
                    controls: [
                        {
                            id: "width",
                            name: "width",
                            value: element.settings.width.value,
                            valueTemplateKey: APFormDefaultTemplateKeys.NUMBER_FIELD,
                            options: {
                                max: 1920,
                                label: "Ширина элемента",
                            },
                        },
                        {
                            id: "height",
                            name: "height",
                            value: element.settings.height.value,
                            valueTemplateKey: APFormDefaultTemplateKeys.NUMBER_FIELD,
                            options: {
                                max: 1920,
                                label: "Высота элемента",
                            },
                        },
                        {
                            id: "text",
                            name: "text",
                            value: element.settings.text ?? null,
                            valueTemplateKey: APFormDefaultTemplateKeys.TEXTAREA_FIELD,
                            options: {
                                maxLength: 300,
                                label: "Текст элемента",
                            },
                        },
                    ],
                };
            }),
        );
    }

    public selectElementSettingsFormModelChange(): Observable<SitePageElementSettings> {
        return this.formsManager.valueChanges("elementSettings").pipe(
            skip(1),
            distinctUntilChanged((previous, current) => isObjectEquals(previous, current)),
            tap(value => this.updateElementSettings(value)),
        );
    }

    private updateElementSettings(value: SitePageElementSettings): void {
        const id = this.getStoreElement("selectedElement");

        logAction(`Update element settings`, id, value);

        this.service.updateState(state => {
            const { items } = state;
            const item = items[id];
            const { settings } = item;

            const width = {
                ...settings.width,
                value: value.width,
            };

            const height = {
                ...settings.height,
                value: value.height,
            };

            return {
                items: {
                    ...items,
                    [id]: {
                        ...item,
                        settings: {
                            ...item.settings,
                            ...value,
                            width: width,
                            height: height,
                        },
                    },
                },
            };
        });
    }

    public tabSelection(currentIndex?: number): void {
        const index = (currentIndex ?? this.getStoreElement("selectedElement")) + 1;
        const items = this.getStoreElement("items");
        const currentStateIndex = this.getStoreElement("currentStateIndex");

        if (index > currentStateIndex) {
            this.service.updateState(() => {
                return {
                    selectedElement: ROOT_ELEMENT_ID,
                };
            });

            return;
        }

        if (items[index]) {
            this.service.updateState(() => {
                return {
                    selectedElement: index,
                };
            });

            return;
        }

        this.tabSelection(index);
    }
}
