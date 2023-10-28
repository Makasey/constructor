import { AbstractEventPlugin } from "@shared-plugins";
import { NgZone } from "@angular/core";

export class SilentEventPlugin extends AbstractEventPlugin {
    public static ngZone?: NgZone;

    protected modifier = ".silent";

    public addEventListener(element: HTMLElement, eventName: string, handler: Function): Function {
        SilentEventPlugin.ngZone = this.manager.getZone();

        return this.manager.getZone().runOutsideAngular(() => this.manager.addEventListener(element, this.unwrap(eventName), handler));
    }
}
