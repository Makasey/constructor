import { AbstractMultiPageOperationService } from "@modules/constructor";
import { InjectionToken, inject } from "@angular/core";
import { Observable, shareReplay } from "rxjs";

export const EDITOR_SELECTED_PAGE = new InjectionToken<Observable<string>>("EDITOR_SELECTED_PAGE");

export function editorSelectedPageFactory(): () => Observable<string> {
    return () => {
        const pageService = inject(AbstractMultiPageOperationService);

        return pageService.selectSelectedPage().pipe(shareReplay(1));
    };
}
