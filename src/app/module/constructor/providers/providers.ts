import { AbstractCampaignService, SinglePageCampaignService } from "@modules/constructor/core/abstract/campaign.service";
import { AbstractEditAreaService, DefaultEditAreaService } from "@modules/constructor/components/edit-area/edit-area.service";
import { AbstractEditorElementActionsService, DefaultEditorElementActionsService } from "@modules/constructor/core/abstract/editor-element.service";
import {
    AbstractEditorElementSettingsService,
    DefaultEditorElementSettingsService,
} from "@modules/constructor/core/abstract/editor-element-settings.service";
import {
    AbstractEditorPageSettingsService,
    SinglePageEditorPageSettingsService,
} from "@modules/constructor/core/abstract/editor-page-settings.service";
import { AbstractEditorSelectionService, SinglePageEditorSelectionService } from "@modules/constructor/core/abstract/editor-selection.service";
import { EDITOR_SELECTED_ELEMENT, editorSelectedElementFactory } from "@modules/constructor/providers/selected-element.provider";
import { LzStateKey } from "@core/store/lz.state";
import { Provider } from "@angular/core";
import { createStoreProviders } from "@core/store/abstract/create-store-providers";

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
