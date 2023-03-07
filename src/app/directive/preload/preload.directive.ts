import { ChangeDetectorRef, Directive, Inject, Injector, Input, OnChanges, TemplateRef, Type, ViewContainerRef } from "@angular/core";

import { PRELOAD_BACKGROUND_CONFIG_TOKEN, PRELOAD_COMPONENTS_CONFIG, PreloadBackgroundComponentKey } from "./types";

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

    constructor(
        private templateRef: TemplateRef<unknown>,
        private viewContainerRef: ViewContainerRef,
        private cdr: ChangeDetectorRef,
        private injector: Injector,
        @Inject(PRELOAD_BACKGROUND_CONFIG_TOKEN) private preloadBackgroundComponentsMap: Record<string, Type<unknown>>,
    ) {}

    public ngOnChanges(): void {
        this.viewContainerRef.clear();
        if (this.loading) {
            const component = this.preloadBackgroundComponentsMap[this.preloadBackgroundType as PreloadBackgroundComponentKey];
            if (component) {
                const newInjector = Injector.create({
                    providers: [
                        {
                            provide: PRELOAD_COMPONENTS_CONFIG,
                            useValue: this.preloadConfig,
                        },
                    ],
                    parent: this.injector,
                });

                // #FIXME Or we can mutate component instance to provide config
                // const componentRef = this.viewContainerRef.createComponent(component, {
                //    injector: newInjector,
                // });
                // (componentRef.instance as PreloadBackgroundComponent<unknown>).test = this.preloadConfig;

                this.viewContainerRef.createComponent(component, {
                    injector: newInjector,
                });
            } else {
                throw Error(
                    `There is no component corresponding to the (${this.preloadBackgroundType}) key.
                     Add it using the forRoot() method of the PreloadBackgroundModule module, or select
                     a different one from the existing ones`,
                );
            }
        } else {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
        }

        this.cdr.markForCheck();
    }
}
