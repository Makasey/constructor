import { AbstractEditAreaService } from "@modules/constructor/components/edit-area/edit-area.service";
import { ComponentWithVCR, SitePageElement, sitePageElementMap } from "@modules/constructor/components/edit-area/types";
import { Directive, Input, OnChanges, SimpleChanges, ViewContainerRef, inject } from "@angular/core";

@Directive({
    selector: "[lzElementResolver]",
    standalone: true,
})
export class ElementResolverDirective implements OnChanges {
    private readonly viewContainerRef = inject(ViewContainerRef);

    private readonly service = inject(AbstractEditAreaService);

    @Input({ required: true })
    public lzElementResolver: SitePageElement | null;

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.lzElementResolver && this.lzElementResolver) {
            const { type, children, isExtendable } = this.lzElementResolver;
            const componentType = sitePageElementMap[type];
            const componentRef = this.viewContainerRef.createComponent<ComponentWithVCR>(componentType);
            componentRef.setInput("item", this.lzElementResolver);

            if (isExtendable) {
                children.forEach(item => {
                    const element = this.service.getElement(item);
                    const componentType = sitePageElementMap[element.type];

                    componentRef.instance.container.createComponent(componentType).setInput("item", item);
                });
            }
        }
    }
}
