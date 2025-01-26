import { EMPTY, ObservableInput } from "rxjs";
import { EventManager } from "@angular/platform-browser";
import { switchMap, take } from "rxjs/operators";

type HTMLElementType = {
    [key in keyof HTMLElement]: HTMLElement[key];
} & Record<string, unknown>;

export class HostBinderAsyncPlugin {
    private manager!: EventManager;

    public supports(event: string): boolean {
        return event.startsWith("$.");
    }

    public addEventListener(element: HTMLElementType, event: string): () => void {
        element[event] = EMPTY;

        const method = this.getMethod(element, event);
        const sub = this.manager
            .getZone()
            .onStable.pipe(
                take(1),
                switchMap(() => element[event] as ObservableInput<unknown>),
            )
            .subscribe(value => method(value));

        return () => sub.unsubscribe();
    }

    private getMethod(element: HTMLElementType, event: string): (...attr: unknown[]) => void {
        const [, key, value, unit = ""] = event.split(".");

        if (event.endsWith(".attr")) {
            return v => element.setAttribute(key, String(v));
        }

        if (key === "class") {
            return v => element.classList.toggle(value, !!v);
        }

        if (key === "style") {
            return v => element.style.setProperty(value, `${v}${unit}`);
        }

        return v => (element[key] = v);
    }
}
