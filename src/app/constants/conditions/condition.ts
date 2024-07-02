import { EQUALS_PATTERN, GREATER_OR_EQUAL_PATTERN, LESS_OR_EQUAL_PATTERN } from "@shared-constants";
import { SearchConditions } from "@shared-enums";

export const conditionsMap: Record<SearchConditions, RegExp> = {
    [SearchConditions.EQUAL]: EQUALS_PATTERN,
    [SearchConditions.GREATER_OR_EQUAL]: GREATER_OR_EQUAL_PATTERN,
    [SearchConditions.LESS_OR_EQUAL]: LESS_OR_EQUAL_PATTERN,
};
