import { NAVIGATION_PROVIDERS } from "./navigation.provider";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";


export const ROOT_PROVIDERS = [
    ...NAVIGATION_PROVIDERS,
    provideHttpClient(withInterceptors, []),
    provideAnimations(),
];