import {
    AbstractCampaignService,
    AbstractEditAreaService,
    AbstractEditorElementActionsService,
    AbstractEditorElementSettingsService,
    AbstractEditorPageSettingsService,
    AbstractEditorSelectionService,
    AbstractMultiPageOperationService,
    DefaultEditAreaService,
    DefaultEditorElementActionsService,
    DefaultEditorElementSettingsService,
    EDITOR_SELECTED_ELEMENT,
    EDITOR_SELECTED_PAGE,
    MultiPageOperationService,
    SinglePageCampaignService,
    SinglePageEditorPageSettingsService,
    SinglePageEditorSelectionService,
    SitePreviewDataService,
    editorSelectedElementFactory,
    editorSelectedPageFactory,
    providePreviewService,
} from "@modules/constructor";
import { LzStateKey, createStoreProviders, providePreviewDataService } from "@core";
import { Provider } from "@angular/core";

export const EDITOR_PROVIDERS: Provider[] = [
    ...createStoreProviders(LzStateKey.EDITOR_STATE),
    { provide: AbstractEditAreaService, useClass: DefaultEditAreaService },
    { provide: AbstractEditorElementSettingsService, useClass: DefaultEditorElementSettingsService },
    { provide: AbstractEditorPageSettingsService, useClass: SinglePageEditorPageSettingsService },
    { provide: AbstractMultiPageOperationService, useClass: MultiPageOperationService },
    { provide: AbstractEditorSelectionService, useClass: SinglePageEditorSelectionService },
    { provide: AbstractEditorElementActionsService, useClass: DefaultEditorElementActionsService },
    { provide: AbstractCampaignService, useClass: SinglePageCampaignService },
    { provide: EDITOR_SELECTED_ELEMENT, useFactory: editorSelectedElementFactory() },
    { provide: EDITOR_SELECTED_PAGE, useFactory: editorSelectedPageFactory() },
    providePreviewDataService(SitePreviewDataService),
    providePreviewService(),
];
