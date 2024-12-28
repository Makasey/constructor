import { AbstractEditorElementActionsService, AbstractEditorElementSettingsService, ELEMENT_ID, SitePageElementUnion } from "@modules/constructor";
import { Directive, Injector, Signal, computed, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";

@Directive()
export abstract class BaseElementAbstract<TElement extends SitePageElementUnion> {
    public readonly ELEMENT_ID = inject(ELEMENT_ID);

    protected readonly abstractEditorElementActionsService = inject(AbstractEditorElementActionsService);

    protected readonly abstractEditorElementSettingsService = inject(AbstractEditorElementSettingsService);

    protected readonly injector = inject(Injector);

    protected readonly element: Signal<TElement> = toSignal(this.abstractEditorElementActionsService.selectElement(this.ELEMENT_ID));

    protected readonly innerSettings: Signal<TElement["settings"]> = toSignal(
        this.abstractEditorElementSettingsService.selectSettings(this.ELEMENT_ID),
    );

    protected selectSlice<T extends keyof TElement["settings"], K = TElement["settings"][T]>(
        key: T,
        mapperFn?: (item: TElement["settings"][T]) => K,
    ): Signal<K> {
        return computed(() => {
            const settingsItem = this.innerSettings()[key];

            if (!mapperFn) {
                mapperFn = item => item as K;
            }

            return mapperFn(settingsItem);
        });
    }
}
