import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";

import { NAVIGATION_PROVIDERS } from "./navigation.provider";
import { EVENT_MANAGER_PLUGIN_PROVIDERS } from "./event-manager.provider";
import { DATA_SERVICES_PROVIDERS } from "./data-service.provider";
import { STORE_PROVIDERS } from "./store.provider";


export const ROOT_PROVIDERS = [
    ...STORE_PROVIDERS,
    ...NAVIGATION_PROVIDERS,
    ...EVENT_MANAGER_PLUGIN_PROVIDERS,
    ...DATA_SERVICES_PROVIDERS,
    provideHttpClient(withInterceptors([])),
    provideAnimations(),
];