import { AbstractEditorSelectionService } from "@modules/constructor";
import { InjectionToken, Injector, Signal, inject } from "@angular/core";
import { shareReplay } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";

export const EDITOR_SELECTED_ELEMENT = new InjectionToken<Signal<string>>("EDITOR_SELECTED_ELEMENT_SIGNAL");

export function editorSelectedElementFactory(): () => Signal<string | undefined> {
    return () => {
        return toSignal(inject(AbstractEditorSelectionService).selectSelectedElement().pipe(shareReplay(1)), {
            injector: inject(Injector),
        });
    };
}
