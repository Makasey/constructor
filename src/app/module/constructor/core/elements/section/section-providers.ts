import { Provider } from "@angular/core";
import { sectionEditorActionsProvider, sectionSelectionProvider } from "@modules/constructor";

export const SECTION_PROVIDERS: Provider[] = [sectionSelectionProvider, sectionEditorActionsProvider];
