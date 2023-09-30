import { LzStateKey, createStoreProviders } from "@core";

import {
    AbstractCampaignService,
    AbstractEditAreaService,
    AbstractEditorElementActionsService,
    AbstractEditorElementSettingsService,
    AbstractEditorPageSettingsService,
    AbstractEditorSelectionService,
    DefaultEditAreaService,
    DefaultEditorElementActionsService,
    DefaultEditorElementSettingsService,
    EDITOR_SELECTED_ELEMENT,
    SinglePageCampaignService,
    SinglePageEditorPageSettingsService,
    SinglePageEditorSelectionService,
    editorSelectedElementFactory,
} from "@modules/constructor";
import { Provider } from "@angular/core";

export const EDITOR_PROVIDERS: Provider[] = [
    ...createStoreProviders(LzStateKey.EDITOR_STATE),
    { provide: AbstractEditAreaService, useClass: DefaultEditAreaService },
    { provide: AbstractEditorElementSettingsService, useClass: DefaultEditorElementSettingsService },
    { provide: AbstractEditorPageSettingsService, useClass: SinglePageEditorPageSettingsService },
    { provide: AbstractEditorSelectionService, useClass: SinglePageEditorSelectionService },
    { provide: AbstractEditorElementActionsService, useClass: DefaultEditorElementActionsService },
    { provide: AbstractCampaignService, useClass: SinglePageCampaignService },
    { provide: EDITOR_SELECTED_ELEMENT, useFactory: editorSelectedElementFactory() },
];
