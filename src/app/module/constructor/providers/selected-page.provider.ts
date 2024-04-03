import { AbstractMultiPageOperationService, ROOT_ELEMENT_ID } from "@modules/constructor";
import { InjectionToken, Injector, Signal, inject } from "@angular/core";
import { shareReplay } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";

export const EDITOR_SELECTED_PAGE = new InjectionToken<Signal<string>>("EDITOR_SELECTED_PAGE");

export function editorSelectedPageFactory(): () => Signal<string> {
    return () => {
        return toSignal(inject(AbstractMultiPageOperationService).selectSelectedPage().pipe(shareReplay(1)), {
            injector: inject(Injector),
            initialValue: ROOT_ELEMENT_ID,
        });
    };
}
