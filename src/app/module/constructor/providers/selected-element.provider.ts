import { AbstractEditorSelectionService } from "@modules/constructor";
import { InjectionToken, inject } from "@angular/core";
import { Observable, shareReplay } from "rxjs";

export const EDITOR_SELECTED_ELEMENT = new InjectionToken<Observable<string>>("EDITOR_SELECTED_ELEMENT");

export function editorSelectedElementFactory(): () => Observable<string> {
    return () => {
        const editorService = inject(AbstractEditorSelectionService);

        return editorService.selectSelectedElement().pipe(shareReplay(1));
    };
}
