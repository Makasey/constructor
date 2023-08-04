import { AbstractEditAreaService } from "@modules/constructor/components/edit-area/edit-area.service";
import { Directive, Injector, Input, OnChanges, SimpleChanges, ViewContainerRef, inject } from "@angular/core";
import { ELEMENT_ID, sitePageElementMap } from "@modules/constructor/components/edit-area/types";

@Directive({
    selector: "[lzElementResolver]",
    standalone: true,
})
export class ElementResolverDirective implements OnChanges {
    private readonly viewContainerRef = inject(ViewContainerRef);

    private readonly service = inject(AbstractEditAreaService);

    private readonly injector = inject(Injector);

    @Input({ required: true })
    public lzElementResolver: number | undefined;

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.lzElementResolver && this.lzElementResolver) {
            const { type, id } = this.service.getElement(this.lzElementResolver);
            const componentType = sitePageElementMap[type];
            const newInjector = Injector.create({
                providers: [
                    {
                        provide: ELEMENT_ID,
                        useValue: id,
                    },
                ],
                parent: this.injector,
            });

            const elementRef = this.viewContainerRef.createComponent<unknown>(componentType, {
                injector: newInjector,
            });

            elementRef.setInput("elementID", id);
        }
    }
}
