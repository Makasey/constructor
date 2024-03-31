import { AbstractEditorSelectionService } from "@modules/constructor";
import { InjectionToken, Injector, Signal, inject } from "@angular/core";
import { Observable, shareReplay } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";

export const EDITOR_SELECTED_ELEMENT = new InjectionToken<Observable<string>>("EDITOR_SELECTED_ELEMENT");

export function editorSelectedElementFactory(): () => Observable<string> {
    return () => {
        const editorService = inject(AbstractEditorSelectionService);

        return editorService.selectSelectedElement().pipe(shareReplay(1));
    };
}

// todo for example
export const EDITOR_SELECTED_ELEMENT_SIGNAL_EXAMPLE = new InjectionToken<Signal<string>>("EDITOR_SELECTED_ELEMENT_SIGNAL_EXAMPLE");

export function editorSelectedElementSignalFactory(): () => Signal<string | undefined> {
    return () => {
        return toSignal(inject(AbstractEditorSelectionService).selectSelectedElement().pipe(shareReplay(1)), {
            injector: inject(Injector),
        });
    };
}
