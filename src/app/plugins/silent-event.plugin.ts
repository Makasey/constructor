import { AbstractEventPlugin } from "@shared-plugins";
import { NgZone } from "@angular/core";

export class SilentEventPlugin extends AbstractEventPlugin {
    public static ngZone?: NgZone;

    protected modifier = ".silent";

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
}
