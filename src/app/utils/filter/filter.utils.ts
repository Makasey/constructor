import { conditionsMap } from "@shared-constants";
import { SearchConditions, RouteParams } from "@shared-enums";
import { FiltersMap } from "@shared-types";

export function filterToQueryParameter(condition: SearchConditions, value: number | string | string[] | number[]): string {
    const stringValue = Array.isArray(value) ? value.join(",") : String(value);
    return `${condition}(${stringValue})`;
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