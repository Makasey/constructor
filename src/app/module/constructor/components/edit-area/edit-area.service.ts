import { APFormDefaultTemplateKeys, APFormModel, LZToastrItemType, LZToastrService } from "@components/ui";
import { AbstractCampaignDataService } from "@core/data-service/campaign-data.service";
import { AbstractLzStoreService } from "@core/store/abstract/lz-abstract.service";
import { AbstractNavigationService } from "@core/navigation.service";
import {
    CampaignModel,
    CampaignType,
    CreateCampaignModel,
    PageSettings,
    ROOT_ELEMENT_ID,
    SitePageElement,
    SitePageElementSettings,
    SitePageElementType,
    defaultPageElementSettingsMap,
    deleteElementFromTree,
    isObjectEquals,
} from "@modules/constructor/components/edit-area/types";
import { Inject, Injectable } from "@angular/core";
import { LzAbstractQuery } from "@core/store/abstract/lz-abstract.query";
import { LzQueryInjectionTokensMap, LzServiceInjectionTokensMap } from "@core/store/abstract/types";
import { LzState, LzStateKey } from "@core/store/lz.state";
import { NgFormsManager } from "@ngneat/forms-manager";
import { Observable, catchError, distinctUntilChanged, map, shareReplay, skip, tap, throwError } from "rxjs";
import { RouteKey } from "@shared-types/routes/route-paths";
import { Router } from "@angular/router";
import { UIDataState } from "@core/store/states/ui-states";
import { arrayAdd, arrayRemove, filterNilValue, logAction } from "@datorama/akita";
import { processElementSettings } from "@modules/constructor/components/edit-area/utils/element-settings.utils";

@Injectable()
export abstract class AbstractEditAreaService {
    public abstract selectElement(id: number): Observable<SitePageElement>;

    public abstract selectIsNewCampaign(): Observable<boolean>;

    public abstract getElement(id: number): SitePageElement;

    public abstract addElement(type: SitePageElementType, parentId?: number): void;

    public abstract deleteElement(elementId: number): void;

    public abstract updateSelection(elementId: number): void;

    public abstract selectSelectedElement(): Observable<number>;

    public abstract selectFormModel(): Observable<APFormModel>;

    public abstract selectElementSettingsFormModel(): Observable<APFormModel | null>;

    public abstract selectSettings<K>(id: number): Observable<K>;

    public abstract selectFormModelChange(): Observable<PageSettings>;

    public abstract selectElementSettingsFormModelChange(): Observable<SitePageElementSettings>;

    public abstract createCampaign(): Observable<CampaignModel>;

    public abstract updateCampaignById(): Observable<CampaignModel>;

    public abstract tabSelection(currentIndex?: number): void;

    public abstract resetState(): void;

    public abstract getCampaignById(id: number): Observable<CampaignModel>;
}

@Injectable()
export class DefaultEditAreaService extends AbstractEditAreaService {
    constructor(
        @Inject(LzQueryInjectionTokensMap[LzStateKey.EDITOR_STATE]) private readonly query: LzAbstractQuery<LzStateKey.EDITOR_STATE>,
        @Inject(LzServiceInjectionTokensMap[LzStateKey.EDITOR_STATE]) private readonly service: AbstractLzStoreService<LzStateKey.EDITOR_STATE>,
        private readonly formsManager: NgFormsManager,
        private readonly navigationService: AbstractNavigationService,
        private readonly campaignDataService: AbstractCampaignDataService,
        private readonly toastrService: LZToastrService,
        private readonly router: Router,
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

    public selectElementSettingsFormModel(): Observable<APFormModel | null> {
        return this.selectSelectedElement().pipe(
            map(selectedElement => {
                if (selectedElement === ROOT_ELEMENT_ID) {
                    return null;
                }

                const element = this.getElement(selectedElement);

                return processElementSettings(element.type, element);
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

    public createCampaign(): Observable<CampaignModel> {
        return this.campaignDataService.createCampaign(this.getCreateCampaignRequestData()).pipe(
            tap(() => {
                this.toastrService.addToastrItem({
                    type: LZToastrItemType.SUCCESS,
                    text: `Компания успешно создана`,
                    title: "Успех",
                });

                const link = this.navigationService.buildLink(RouteKey.CAMPAIGN_LIST);

                void this.router.navigate([link]);
            }),
        );
    }

    public updateCampaignById(): Observable<CampaignModel> {
        const id = this.getStoreElement("settings").id!;

        return this.campaignDataService.updateCampaignByID(id, this.getCreateCampaignRequestData()).pipe(
            tap(() => {
                this.toastrService.addToastrItem({
                    type: LZToastrItemType.SUCCESS,
                    text: `Компания с id: ${id} успешно обновлена`,
                    title: "Успех",
                });

                const link = this.navigationService.buildLink(RouteKey.CAMPAIGN_LIST);

                void this.router.navigate([link]);
            }),
        );
    }

    private getCreateCampaignRequestData(): CreateCampaignModel {
        const { settings, items } = this.query.getValue();

        return {
            model: items,
            campaignName: settings.campaignName,
            settings: {
                ...settings,
                id: undefined,
            },
            type: CampaignType.SINGLE_PAGE,
        };
    }

    public resetState(): void {
        this.service.reInitiateState(LzStateKey.EDITOR_STATE);
    }

    public getCampaignById(id: number): Observable<CampaignModel> {
        return this.campaignDataService.getCampaignByID(id).pipe(
            tap(campaign => {
                this.service.updateState(() => {
                    const { id, settings, model } = campaign;
                    const currentStateIndex = this.getMaxIndex(model);

                    return {
                        items: model,
                        dataState: UIDataState.LOADED,
                        currentStateIndex: currentStateIndex,
                        settings: {
                            ...settings,
                            id: id,
                        },
                    };
                });
            }),
            catchError(err => {
                this.toastrService.addToastrItem({
                    type: LZToastrItemType.ERROR,
                    title: "Компания не найдена",
                    text: `Компания с id: ${id} не найдена`,
                });

                const link = this.navigationService.buildLink(RouteKey.CAMPAIGN_LIST);

                void this.router.navigate([link]);

                return throwError(err);
            }),
        );
    }

    public getMaxIndex(items: Record<number, SitePageElement>): number {
        return Math.max(...(Object.keys(items) as unknown as number[]));
    }

    public selectIsNewCampaign(): Observable<boolean> {
        return this.query
            .select(state => state.settings.id)
            .pipe(
                map(id => {
                    return !id;
                }),
            );
    }
}
