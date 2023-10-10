import { AbstractEditorElementActionsService, ELEMENT_ID, PARENT_ID, SitePageElementUnion, sitePageElementMap } from "@modules/constructor";
import { Directive, Injector, Input, OnChanges, Type, ViewContainerRef, inject } from "@angular/core";

@Directive({
    selector: "[lzElementResolver]",
    standalone: true,
})
export class ElementResolverDirective implements OnChanges {
    private readonly viewContainerRef = inject(ViewContainerRef);

    private readonly service: AbstractEditorElementActionsService<SitePageElementUnion> = inject(AbstractEditorElementActionsService);

    private readonly injector = inject(Injector);

    @Input({ required: true })
    public lzElementResolver: string | undefined;

    @Input()
    public lzElementResolverParent: string | undefined;

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
