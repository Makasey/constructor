import { EventManager } from "@angular/platform-browser";

type EventManagerArg = ConstructorParameters<typeof EventManager>[0][0];

type EventManagerPlugin = {
    [K in keyof EventManagerArg]: EventManagerArg[K];
};

export abstract class AbstractEventPlugin implements EventManagerPlugin {
    protected abstract readonly modifier: string;

    public abstract addEventListener(element: HTMLElement, eventName: string, handler: Function): Function;

    public manager!: EventManager;

    public supports(eventName: string): boolean {
        return eventName.includes(this.modifier);
    }

    protected unwrap(event: string): string {
        return event
            .split(".")
            .filter(v => !this.modifier.includes(v))
            .join(".");
    }
}
