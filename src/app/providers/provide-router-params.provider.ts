import { ActivatedRoute } from "@angular/router";
import { InjectionToken, Provider, inject } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export const GET_ROUTER_PARAMS_TOKEN = new InjectionToken("Get router params token");

export function getRouterParamsFactory(paramNames: string[]): (paramNames: string) => Record<string, unknown> {
    return () => {
        const activatedRoute = inject(ActivatedRoute);
        const queryParametersMap = activatedRoute.root.snapshot.queryParamMap;
        const queryMap: Record<string, unknown> = {};

        paramNames.forEach(param => {
            queryMap[param] = queryParametersMap.get(param);
        });

        return queryMap;
    };
}

export function provideGetRouterParams(paramNames: string[]): Provider {
    return {
        provide: GET_ROUTER_PARAMS_TOKEN,
        useFactory: getRouterParamsFactory(paramNames),
    };
}

export const SELECT_ROUTER_PARAMS_TOKEN = new InjectionToken("Select router params token");

export function selectRouterParamsFactory(paramNames: string[]): (paramNames: string) => Observable<Record<string, unknown>> {
    return () => {
        const router = inject(ActivatedRoute);
        return router.root.queryParamMap.pipe(
            map(paramMap => {
                const queryMap: Record<string, unknown> = {};
                paramNames.forEach(paramName => {
                    queryMap[paramName] = paramMap.get(paramName);
                });
                return queryMap;
            }),
        );
    };
}

export function provideSelectRouterParams(paramNames: string[]): Provider {
    return {
        provide: SELECT_ROUTER_PARAMS_TOKEN,
        useFactory: selectRouterParamsFactory(paramNames),
    };
}
