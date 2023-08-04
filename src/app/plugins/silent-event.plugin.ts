import { EventManager } from "@angular/platform-browser";
import { NgZone } from "@angular/core";

export class SilentEventPlugin {
    public static ngZone?: NgZone;

    private manager!: EventManager;

    private modifier = ".silent";

    public supports(event: string): boolean {
        return event.includes(this.modifier);
    }

    public addEventListener(
        element: HTMLElement,
        event: string,
        // eslint-disable-next-line @typescript-eslint/ban-types
        handler: Function,
        // eslint-disable-next-line @typescript-eslint/ban-types
    ): Function {
        SilentEventPlugin.ngZone = this.manager.getZone();

        return this.manager.getZone().runOutsideAngular(() => this.manager.addEventListener(element, this.unwrap(event), handler));
    }

    private unwrap(event: string): string {
        return event
            .split(".")
            .filter(value => !this.modifier.includes(value))
            .join(".");
    }
}
