import { ActivatedRoute } from "@angular/router";
import { Injector } from "@angular/core";

import { Observable, map } from "rxjs";

import { APP_REF } from "@core";

import { RouteParams, SearchConditions } from "../../types";
import { conditionsMap } from "../utils";

export function getRouterParameters(...paramNames: string[]): unknown | Record<string, unknown> {
    const injector = APP_REF.injector as Injector;
    const queryParametersMap = injector.get(ActivatedRoute).root.snapshot.queryParamMap;
    const queryMap: Record<string, unknown> = {};

    paramNames.forEach(param => {
        queryMap[param] = queryParametersMap.get(param);
    });

    return paramNames.length > 1 ? queryMap : queryMap[paramNames[0]];
}

export function selectRouterParameters(...paramNames: string[]): Observable<Record<string, unknown>> {
    const injector = APP_REF.injector as Injector;
    const router = injector.get(ActivatedRoute);
    return router.root.queryParamMap.pipe(
        map(paramMap => {
            const queryMap: Record<string, unknown> = {};
            paramNames.forEach(paramName => {
                queryMap[paramName] = paramMap.get(paramName);
            });
            return queryMap;
        }),
    );
}

export function convertRouteParamsToParamsWithConditions(params: Record<string, unknown>): FiltersMap {
    const filtersMap: FiltersMap = {} as FiltersMap;

    Object.keys(params).forEach(key => {
        Object.keys(conditionsMap).forEach((condition: string) => {
            if (conditionsMap[condition as SearchConditions].exec(params[key] as string)) {
                if (!filtersMap[key as RouteParams]) {
                    filtersMap[key as RouteParams] = {
                        value: conditionsMap[condition as SearchConditions].exec(params[key] as string)![2],
                        condition: condition as SearchConditions,
                    };
                }
            }
        });
    });

    return filtersMap;
}

export type FiltersMap = {
    [key in RouteParams]: ValueWithCondition;
};

export type ValueWithCondition = {
    value: string;
    condition: SearchConditions;
};
