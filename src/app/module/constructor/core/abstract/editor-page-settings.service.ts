import { APFormDefaultTemplateKeys, APFormModel } from "@components/ui";
import { AbstractLzStoreService } from "@core/store/abstract/lz-abstract.service";
import { Inject, Injectable } from "@angular/core";
import { LzAbstractQuery } from "@core/store/abstract/lz-abstract.query";
import { LzQueryInjectionTokensMap, LzServiceInjectionTokensMap } from "@core/store/abstract/types";
import { LzStateKey } from "@core/store/lz.state";
import { NgFormsManager } from "@ngneat/forms-manager";
import { Observable, distinctUntilChanged, map, skip, tap } from "rxjs";
import { PageSettings } from "@modules/constructor/components/edit-area/types";
import { isObjectEquals } from "@shared-utils/object.utils";
import { logAction } from "@datorama/akita";

@Injectable()
export abstract class AbstractEditorPageSettingsService {
    protected constructor(
        protected query: LzAbstractQuery<LzStateKey.EDITOR_STATE>,
        protected service: AbstractLzStoreService<LzStateKey.EDITOR_STATE>,
        protected readonly formsManager: NgFormsManager,
    ) {}

    public selectFormModel(): Observable<APFormModel> {
        return this.query
            .select(state => state.settings)
            .pipe(
                map(settings => {
                    const { title, campaignName, logotype } = settings;

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
                                name: "logotype",
                                valueTemplateKey: APFormDefaultTemplateKeys.FILE_UPLOAD,
                                value: logotype,
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

    protected updatePageSettings(value: PageSettings): void {
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
