import { AbstractEditAreaService } from "@modules/constructor/components/edit-area/edit-area.service";
import { InjectionToken, inject } from "@angular/core";
import { Observable } from "rxjs";

export const EDITOR_SELECTED_ELEMENT = new InjectionToken<Observable<number | null>>("EDITOR_SELECTED_ELEMENT");

export function editorSelectedElementFactory(): () => Observable<number | null> {
    return () => {
        const editorService = inject(AbstractEditAreaService);

        return editorService.selectSelectedElement();
    };
}
