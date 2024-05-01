import { RouteParams, SearchConditions } from "@shared-enums";

export type FiltersMap = {
    [key in RouteParams]: ValueWithCondition;
};

export type ValueWithCondition = {
    value: string;
    condition: SearchConditions;
};