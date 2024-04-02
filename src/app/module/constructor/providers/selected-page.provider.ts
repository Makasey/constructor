import { AbstractMultiPageOperationService } from "@modules/constructor";
import { InjectionToken, Injector, Signal, inject } from "@angular/core";
import { shareReplay } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";

export const EDITOR_SELECTED_PAGE = new InjectionToken<Signal<string>>("EDITOR_SELECTED_PAGE");

export function editorSelectedPageFactory(): () => Signal<string | undefined> {
    return () => {
        return toSignal(inject(AbstractMultiPageOperationService).selectSelectedPage().pipe(shareReplay(1)), {
            injector: inject(Injector),
        });
    };
}
