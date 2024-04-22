import { AbstractNavigationService, NavigationService } from "@core";
import { provideRouter, withRouterConfig } from "@angular/router";
import { APP_ROUTES } from "./routes";

export const NAVIGATION_PROVIDERS = [
    {
        provide: AbstractNavigationService,
        useClass: NavigationService,
    },
    provideRouter(APP_ROUTES, withRouterConfig({paramsInheritanceStrategy: 'always'})),
];