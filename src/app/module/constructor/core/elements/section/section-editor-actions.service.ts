import {
    AbstractEditorElementActionsService,
    AbstractEditorElementSettingsService,
    ColumnStructure,
    SectionPageElement,
    SectionPageElementSettings,
    SitePageElementType,
    processStructureType,
} from "@modules/constructor";
import { AbstractLzStoreService, LzAbstractQuery, LzQueryInjectionTokensMap, LzServiceInjectionTokensMap, LzStateKey } from "@core";
import { Inject, Injectable, Provider } from "@angular/core";

@Injectable()
export abstract class AbstractSectionEditorActionsService extends AbstractEditorElementActionsService<SectionPageElement> {
    protected constructor(
        @Inject(LzQueryInjectionTokensMap[LzStateKey.EDITOR_STATE]) protected readonly query: LzAbstractQuery<LzStateKey.EDITOR_STATE>,
        @Inject(LzServiceInjectionTokensMap[LzStateKey.EDITOR_STATE]) protected service: AbstractLzStoreService<LzStateKey.EDITOR_STATE>,
    ) {
        super(query, service);
    }

    public abstract chooseColumnStructureType(elementId: number, type: ColumnStructure): void;
}

@Injectable()
export class SectionEditorActionsService extends AbstractSectionEditorActionsService {
    constructor(
        @Inject(LzQueryInjectionTokensMap[LzStateKey.EDITOR_STATE]) protected readonly query: LzAbstractQuery<LzStateKey.EDITOR_STATE>,
        @Inject(LzServiceInjectionTokensMap[LzStateKey.EDITOR_STATE]) protected service: AbstractLzStoreService<LzStateKey.EDITOR_STATE>,
        private elementSettingsService: AbstractEditorElementSettingsService<SectionPageElementSettings>,
    ) {
        super(query, service);
    }

    public chooseColumnStructureType(elementId: number, type: ColumnStructure): void {
        const elements = processStructureType(type);

        this.elementSettingsService.updateElementSettings({ isInit: true }, elementId);

        elements.forEach(() => {
            this.addElement(SitePageElementType.INNER, elementId);
        });
    }
}

export const sectionEditorActionsProvider: Provider = {
    provide: AbstractEditorElementActionsService,
    useClass: SectionEditorActionsService,
};
