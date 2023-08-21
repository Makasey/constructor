import { AbstractEditAreaService, DefaultEditAreaService, EDITOR_SELECTED_ELEMENT, editorSelectedElementFactory } from "@modules/constructor";
import { LzStateKey } from "@core/store/lz.state";
import { Provider } from "@angular/core";
import { createStoreProviders } from "@core/store/abstract/create-store-providers";

export const EDITOR_PROVIDERS: Provider[] = [
    ...createStoreProviders(LzStateKey.EDITOR_STATE),
    { provide: AbstractEditAreaService, useClass: DefaultEditAreaService },
    { provide: EDITOR_SELECTED_ELEMENT, useFactory: editorSelectedElementFactory() },
];
