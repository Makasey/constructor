import { AbstractEventPlugin } from "./abstract-event.plugin";

export class ResizeEventPlugin extends AbstractEventPlugin {
    protected readonly modifier = "resize";

    public addEventListener(element: HTMLElement, _: string, handler: Function): Function {
        if (typeof ResizeObserver === "undefined") {
            return () => {};
        }

        const observer = new ResizeObserver(e => this.manager.getZone().run(() => handler(e)));

        observer.observe(element);

        return () => observer.disconnect();
    }
}
