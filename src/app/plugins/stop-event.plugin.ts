import { AbstractEventPlugin } from "./abstract-event.plugin";

export class StopEventPlugin extends AbstractEventPlugin {
    protected readonly modifier = ".stop";

    public addEventListener(element: HTMLElement, event: string, handler: Function): Function {
        const wrapped = (event: Event): void => {
            event.stopPropagation();
            handler(event);
        };

        return this.manager.addEventListener(element, this.unwrap(event), wrapped);
    }
}
