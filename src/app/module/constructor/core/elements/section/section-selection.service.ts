import { AbstractEditorSelectionService } from "@modules/constructor";
import { AbstractLzStoreService, LzAbstractQuery, LzQueryInjectionTokensMap, LzServiceInjectionTokensMap, LzStateKey } from "@core";
import { Inject, Injectable, Provider } from "@angular/core";

@Injectable()
export class SectionSelectionService extends AbstractEditorSelectionService {
    constructor(
        @Inject(LzQueryInjectionTokensMap[LzStateKey.EDITOR_STATE]) protected readonly query: LzAbstractQuery<LzStateKey.EDITOR_STATE>,
        @Inject(LzServiceInjectionTokensMap[LzStateKey.EDITOR_STATE]) protected service: AbstractLzStoreService<LzStateKey.EDITOR_STATE>,
    ) {
        super(query, service);
    }

    public updateSectionSelection(elementId: number): void {
        const selectedElement = this.getStoreElement("selectedElement");

        if (selectedElement === elementId) {
            return;
        }

        this.selectElement(elementId);
    }
}

export const sectionSelectionProvider: Provider = {
    provide: AbstractEditorSelectionService,
    useClass: SectionSelectionService,
};
