import { APFormDefaultTemplateKeys, APFormModel } from "@components";
import { AbstractEditorOperationService, PageSettings, ROOT_ELEMENT_ID, SitePageElement, duplicateTreeElement } from "@modules/constructor";
import { AbstractLzStoreService, LzAbstractQuery, LzQueryInjectionTokensMap, LzServiceInjectionTokensMap, LzStateKey, Page } from "@core";
import { Inject, Injectable } from "@angular/core";
import { NgFormsManager } from "@ngneat/forms-manager";
import { Observable, distinctUntilChanged, map, skip, tap } from "rxjs";
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
                const { selectedPage, pages } = state;

                const page = pages.find(page => page.id === selectedPage)!;

                return page.settings;
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
        logAction("Update page settings", [], value);

        this.service.updateState(() => {
            const selectedPage = this.getStoreElement("selectedPage");
            const pages = this.getStoreElement("pages");

            const updatedPages = pages.map(page => {
                if (page.id === selectedPage) {
                    return {
                        ...page,
                        settings: {
                            ...page.settings,
                            ...value,
                        },
                    };
                }

                return page;
            });

            return {
                pages: updatedPages,
            };
        });
    }

    public addPage(): void {
        this.service.updateState(() => {
            const pages: Page[] = this.getStoreElement("pages");

            const newPage: Page = {
                id: getRandomId(),
                settings: {
                    title: "My best page",
                    logotype: null,
                    siteDescription: "My best page",
                    siteMetaTags: "",
                },
                children: [],
            };
            const newPageId = newPage.id;

            return {
                pages: [...pages, newPage],
                selectedPage: newPageId,
            };
        });
    }

    public deletePageById(id: string): void {
        this.service.updateState(() => {
            const pages: Page[] = this.getStoreElement("pages");

            if (pages.length > 1) {
                const updatePages: Page[] = pages.filter(page => page.id !== id);

                const selectedPageId = updatePages[0].id;

                return {
                    pages: updatePages,
                    selectedPage: selectedPageId,
                };
            }

            return;
        });
    }

    public copyPageById(id: string): void {
        this.service.updateState(() => {
            const pages: Page[] = this.getStoreElement("pages");
            const items = this.getStoreElement("items");

            const page: Page = pages.find(page => page.id === id)!;

            const pageCopy: Page = {
                ...page,
                id: getRandomId(),
                settings: {
                    ...page?.settings,
                    title: page?.settings.title + " копия",
                },
            };

            if (!page.children.length) {
                const pageCopyId = pageCopy.id;

                const updatePages = [...pages, pageCopy];

                return {
                    pages: updatePages,
                    selectedPage: pageCopyId,
                };
            }

            let updatedTree: Record<string, SitePageElement> = { ...items };
            const children: string[] = [];

            pageCopy.children.forEach(child => {
                const item = { ...items[child] };

                const duplicatedItem = {
                    ...item,
                };
                const newElementId = getRandomId();

                children.push(newElementId);

                updatedTree = duplicateTreeElement(items, duplicatedItem, ROOT_ELEMENT_ID, newElementId);
            });

            const updatePages: Page[] = [
                ...pages,
                {
                    ...pageCopy,
                    children: children,
                },
            ];

            return {
                items: updatedTree,
                pages: updatePages,
                selectedPage: pageCopy.id,
            };
        });
    }

    public selectPages(): Observable<Page[]> {
        return this.query.select(state => {
            return state.pages;
        });
    }

    public selectPage(id: string): void {
        this.service.updateState(() => {
            return {
                selectedPage: id,
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
