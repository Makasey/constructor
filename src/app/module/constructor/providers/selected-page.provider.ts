import { AbstractMultiPageOperationService } from "@modules/constructor";
import { InjectionToken, Injector, Signal, inject } from "@angular/core";
import { shareReplay } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";

export const EDITOR_SELECTED_PAGE = new InjectionToken<Signal<string>>("EDITOR_SELECTED_PAGE");

export function editorSelectedPageFactory(): () => Signal<string> {
    return () => {
        const service = inject(AbstractMultiPageOperationService);
        const selectedPage = service.getStoreElement("selectedPage");

        return toSignal(service.selectSelectedPage().pipe(shareReplay(1)), {
            injector: inject(Injector),
            initialValue: selectedPage,
        });
    };
}
