import { APP_ROUTES } from "./routes";
import { AbstractNavigationService, NavigationService } from "@core";
import { provideRouter, withRouterConfig } from "@angular/router";

export const NAVIGATION_PROVIDERS = [
    {
        provide: AbstractNavigationService,
        useClass: NavigationService,
    },
    provideRouter(APP_ROUTES, withRouterConfig({ paramsInheritanceStrategy: "always" })),
];
