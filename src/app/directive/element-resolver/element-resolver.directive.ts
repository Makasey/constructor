import { AbstractEditorElementActionsService } from "@modules/constructor/core/abstract/editor-element.service";
import { Directive, Injector, Input, OnChanges, Type, ViewContainerRef, inject } from "@angular/core";
import { ELEMENT_ID, PARENT_ID, sitePageElementMap } from "@modules/constructor/components/edit-area/constants";
import { SitePageElementUnion } from "@modules/constructor/components/edit-area/types";

@Directive({
    selector: "[lzElementResolver]",
    standalone: true,
})
export class ElementResolverDirective implements OnChanges {
    private readonly viewContainerRef = inject(ViewContainerRef);

    private readonly service: AbstractEditorElementActionsService<SitePageElementUnion> = inject(AbstractEditorElementActionsService);

    private readonly injector = inject(Injector);

    @Input({ required: true })
    public lzElementResolver: number | undefined;

    @Input()
    public lzElementResolverParent: number | undefined;

    public ngOnChanges(): void {
        if (this.lzElementResolver && this.lzElementResolverParent) {
            const { type, id } = this.service.getElement(this.lzElementResolver);
            const componentType: Type<unknown> = sitePageElementMap[type];
            const newInjector = Injector.create({
                providers: [
                    {
                        provide: ELEMENT_ID,
                        useValue: id,
                    },
                    {
                        provide: PARENT_ID,
                        useValue: this.lzElementResolverParent,
                    },
                ],
                parent: this.injector,
            });

            this.viewContainerRef.createComponent<unknown>(componentType, {
                injector: newInjector,
            });
        }
    }
}
