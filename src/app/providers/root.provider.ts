import { provideAnimations } from "@angular/platform-browser/animations";
import { provideHttpClient, withInterceptors } from "@angular/common/http";

import { DATA_SERVICES_PROVIDERS } from "./data-service.provider";
import { EVENT_MANAGER_PLUGIN_PROVIDERS } from "./event-manager.provider";
import { NAVIGATION_PROVIDERS } from "./navigation.provider";
import { STORE_PROVIDERS, provideAkitaDevtools } from "./store.provider";
import { TOASTR_PROVIDERS } from "./toastr.providers";
import { provideExperimentalZonelessChangeDetection } from "@angular/core";

export const ROOT_PROVIDERS = [
    provideAkitaDevtools(),
    ...STORE_PROVIDERS,
    ...NAVIGATION_PROVIDERS,
    ...EVENT_MANAGER_PLUGIN_PROVIDERS,
    ...DATA_SERVICES_PROVIDERS,
    ...TOASTR_PROVIDERS,
    provideHttpClient(withInterceptors([])),
    provideAnimations(),
    provideExperimentalZonelessChangeDetection(),
];
