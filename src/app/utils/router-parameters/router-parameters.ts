import { RouteParams, SearchConditions } from "@shared-types";
import { conditionsMap } from "@shared-utils";

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
