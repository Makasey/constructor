import { AbstractEditorElementActionsService, ELEMENT_ID, PARENT_ID, SitePageElementUnion, sitePageElementMap } from "@modules/constructor";
import { Directive, Injector, OnChanges, Type, ViewContainerRef, inject, input } from "@angular/core";

@Directive({
    selector: "[lzElementResolver],[*lzElementResolver]",
    standalone: true,
})
export class ElementResolverDirective implements OnChanges {
    private readonly viewContainerRef = inject(ViewContainerRef);

    private readonly service: AbstractEditorElementActionsService<SitePageElementUnion> = inject(AbstractEditorElementActionsService);

    private readonly injector = inject(Injector);

    public readonly lzElementResolver = input.required<string | undefined>();

    public readonly lzElementResolverParent = input.required<string | undefined>();

    public ngOnChanges(): void {
        const lzElementResolver = this.lzElementResolver();
        const lzElementResolverParent = this.lzElementResolverParent();
        if (lzElementResolver && lzElementResolverParent) {
            this.viewContainerRef.clear();
            const { type, id } = this.service.getElement(lzElementResolver);
            const componentType: Type<unknown> = sitePageElementMap[type];
            const newInjector = Injector.create({
                providers: [
                    {
                        provide: ELEMENT_ID,
                        useValue: id,
                    },
                    {
                        provide: PARENT_ID,
                        useValue: lzElementResolverParent,
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
