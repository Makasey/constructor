import { AbstractEditAreaService, DefaultEditAreaService } from "@modules/constructor/components/edit-area/edit-area.service";
import { EDITOR_SELECTED_ELEMENT, editorSelectedElementFactory } from "@modules/constructor/providers/selected-element.provider";
import { LzStateKey } from "@core/store/lz.state";
import { Provider } from "@angular/core";
import { createStoreProviders } from "@core/store/abstract/create-store-providers";

export const EDITOR_PROVIDERS: Provider[] = [
    ...createStoreProviders(LzStateKey.EDITOR_STATE),
    { provide: AbstractEditAreaService, useClass: DefaultEditAreaService },
    { provide: EDITOR_SELECTED_ELEMENT, useFactory: editorSelectedElementFactory() },
];
