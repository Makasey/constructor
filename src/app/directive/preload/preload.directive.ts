import { ChangeDetectorRef, Directive, Injector, Input, OnChanges, TemplateRef, ViewContainerRef } from "@angular/core";
import { PreloadBackgroundComponent, PreloadBackgroundComponentKey, preloadBackgroundComponentsMap } from "./types";

@Directive({
    selector: "[preloadBackground]",
})
export class PreloadDirective implements OnChanges {
    @Input("preloadBackground")
    public preloadBackgroundType: string;

    @Input("preloadBackgroundLoading")
    public loading: boolean = true;

    @Input("preloadBackgroundConfig")
    public preloadConfig: Record<string, unknown>;

    constructor(private templateRef: TemplateRef<unknown>, private viewContainerRef: ViewContainerRef, private cdr: ChangeDetectorRef, private injector: Injector) {}

    public ngOnChanges(): void {
        this.viewContainerRef.clear();

        if (this.loading) {
            const component = preloadBackgroundComponentsMap[this.preloadBackgroundType as PreloadBackgroundComponentKey];
            if (!!component) {
                const newInjector = Injector.create({
                    providers: [
                        {
                            provide: "config",
                            useValue: this.preloadConfig,
                        },
                    ],
                    parent: this.injector,
                });

                const componentRef = this.viewContainerRef.createComponent(component, {
                    injector: newInjector,
                });

                (componentRef.instance as PreloadBackgroundComponent<unknown>).test = this.preloadConfig;
            } else {
                throw Error('There is no component corresponding to the "' + this.preloadBackgroundType + '" key. Add it using the forRoot() method ' + "of the UMPreloadBackgroundModule module, or select a different one from the existing ones");
            }
        } else {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
        }

        this.cdr.markForCheck();
    }
}
