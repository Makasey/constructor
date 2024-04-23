import { EVENT_MANAGER_PLUGINS } from "@angular/platform-browser";
import { HostBinderAsyncPlugin, PreventEventPlugin, SilentEventPlugin, StopEventPlugin } from "@shared-plugins";

export const EVENT_MANAGER_PLUGIN_PROVIDERS = [
    {
        provide: EVENT_MANAGER_PLUGINS,
        multi: true,
        useClass: SilentEventPlugin,
    },
    {
        provide: EVENT_MANAGER_PLUGINS,
        multi: true,
        useClass: StopEventPlugin,
    },
    {
        provide: EVENT_MANAGER_PLUGINS,
        multi: true,
        useClass: PreventEventPlugin,
    },
    {
        provide: EVENT_MANAGER_PLUGINS,
        multi: true,
        useClass: HostBinderAsyncPlugin,
    },
];
