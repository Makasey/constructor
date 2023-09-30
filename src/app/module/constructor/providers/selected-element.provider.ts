import { AbstractEditorSelectionService } from "@modules/constructor";
import { InjectionToken, inject } from "@angular/core";
import { Observable, shareReplay } from "rxjs";

export const EDITOR_SELECTED_ELEMENT = new InjectionToken<Observable<number>>("EDITOR_SELECTED_ELEMENT");

export function editorSelectedElementFactory(): () => Observable<number> {
    return () => {
        const editorService = inject(AbstractEditorSelectionService);

        return editorService.selectSelectedElement().pipe(shareReplay(1));
    };
}
