import { AbstractEventPlugin } from "./abstract-event.plugin";

export class PreventEventPlugin extends AbstractEventPlugin {
    protected readonly modifier = ".prevent";

    public addEventListener(element: HTMLElement, eventName: string, handler: Function): Function {
        const wrapped = (event: Event): void => {
            event.preventDefault();
            handler(event);
        };

        return this.manager.addEventListener(element, this.unwrap(eventName), wrapped);
    }
}
