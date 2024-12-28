import {
    ElementRef,
    HostBinding,
    Injector,
    Renderer2,
    RendererStyleFlags2,
    Signal,
    WritableSignal,
    effect,
    inject,
    runInInjectionContext,
} from "@angular/core";
import { assertInjector } from "./assert-injector";

export function hostBinding<T, TSignalType extends Signal<T> | WritableSignal<T>>(
    signal: TSignalType,
    hostPropertyName: Required<HostBinding>["hostPropertyName"],
    injector?: Injector,
): TSignalType {
    injector = assertInjector(hostBinding, injector);

    runInInjectionContext(injector, () => {
        debugger;

        const renderer = inject(Renderer2);
        const element = inject(ElementRef).nativeElement;

        let previousClasses: string[] = [];

        effect(() => {
            const value = signal();

            const [binding, property, unit] = hostPropertyName.split(".");

            switch (binding) {
                case "style": {
                    const renderFlag = property.startsWith("--") ? RendererStyleFlags2.DashCase : undefined;
                    const processedValue = `${value}${unit ?? ""}`;

                    renderer.setStyle(element, property, processedValue, renderFlag);

                    break;
                }

                case "attr": {
                    if (value === null || value === undefined) {
                        renderer.removeAttribute(element, property);

                        break;
                    }

                    renderer.setAttribute(element, property, String(value));

                    break;
                }

                case "class": {
                    if (!property) {
                        previousClasses.forEach(className => renderer.removeClass(element, className));

                        previousClasses = typeof value === "string" ? value.split(" ").filter(Boolean) : [];

                        previousClasses.forEach(className => renderer.addClass(element, className));

                        break;
                    }

                    if (value) {
                        renderer.addClass(element, property);
                        break;
                    }

                    renderer.removeClass(element, property);

                    break;
                }
            }
        });
    });

    return signal;
}
