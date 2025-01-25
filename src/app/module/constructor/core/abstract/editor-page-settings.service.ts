import { APFormDefaultTemplateKeys, APFormModel } from "@components";
import { AbstractEditorOperationService, PageSettings } from "@modules/constructor";
import { AbstractLzStoreService, LzAbstractQuery, LzQueryInjectionTokensMap, LzServiceInjectionTokensMap, LzStateKey } from "@core";
import { Inject, Injectable } from "@angular/core";
import { NgFormsManager } from "@ngneat/forms-manager";
import { Observable, distinctUntilChanged, map, skip, tap } from "rxjs";
import { RootElement, RootElementSettings } from "@modules/constructor/components/elements/root/types";
import { getRandomId, isObjectEquals } from "@shared-utils";
import { logAction } from "@datorama/akita";

@Injectable()
export abstract class AbstractEditorPageSettingsService extends AbstractEditorOperationService {
    protected constructor(
        protected query: LzAbstractQuery<LzStateKey.EDITOR_STATE>,
        protected service: AbstractLzStoreService<LzStateKey.EDITOR_STATE>,
        protected readonly formsManager: NgFormsManager,
    ) {
        super(query, service);
    }

    public selectFormModel(): Observable<APFormModel> {
        return this.query
            .select(state => {
                const { selectedPage } = state;

                return this.getElement(selectedPage).settings as RootElementSettings;
            })
            .pipe(
                map(settings => {
                    const { title, logotype, siteMetaTags, siteDescription } = settings;

                    return {
                        id: getRandomId(),
                        name: "globalSettings",
                        upsertConfig: {
                            debounceTime: 500,
                        },
                        controls: [
                            {
                                id: getRandomId(),
                                name: "title",
                                valueTemplateKey: APFormDefaultTemplateKeys.TEXT_FIELD,
                                value: title,
                                options: {
                                    label: "Название сайта",
                                    maxLength: 30,
                                },
                            },
                            {
                                id: getRandomId(),
                                name: "logotype",
                                valueTemplateKey: APFormDefaultTemplateKeys.FILE_UPLOAD,
                                value: logotype,
                            },
                            {
                                id: getRandomId(),
                                name: "siteDescription",
                                valueTemplateKey: APFormDefaultTemplateKeys.TEXTAREA_FIELD,
                                value: siteDescription,
                                options: {
                                    maxLength: 300,
                                    label: "Описание вашей компании",
                                },
                            },

                            {
                                id: getRandomId(),
                                name: "siteMetaTags",
                                valueTemplateKey: APFormDefaultTemplateKeys.TEXTAREA_FIELD,
                                value: siteMetaTags,
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

    protected updatePageSettings(value: PageSettings): void {
        this.service.updateState(() => {
            const selectedPage = this.getStoreElement("selectedPage");

            logAction("Update page settings", [selectedPage], value);

            const items = this.getStoreElement("items");
            const page: RootElement = this.getElement(selectedPage);
            const updatedPage: RootElement = {
                ...page,
                settings: {
                    ...page.settings,
                    ...value,
                },
            };

            return {
                items: {
                    ...items,
                    [selectedPage]: updatedPage,
                },
            };
        });
    }

    public selectCampaignName(): Observable<string> {
        return this.query.select(state => state.campaignName);
    }

    public updateCampaignName(campaignName: string): void {
        this.service.updateState(() => {
            return {
                campaignName: campaignName,
            };
        });
    }
}

@Injectable()
export class SinglePageEditorPageSettingsService extends AbstractEditorPageSettingsService {
    constructor(
        @Inject(LzQueryInjectionTokensMap[LzStateKey.EDITOR_STATE]) protected readonly query: LzAbstractQuery<LzStateKey.EDITOR_STATE>,
        @Inject(LzServiceInjectionTokensMap[LzStateKey.EDITOR_STATE]) protected readonly service: AbstractLzStoreService<LzStateKey.EDITOR_STATE>,
        protected readonly formsManager: NgFormsManager,
    ) {
        super(query, service, formsManager);
    }
}
