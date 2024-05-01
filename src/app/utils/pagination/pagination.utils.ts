import { HttpResponse } from "@angular/common/http";

import { TOTAL_COUNT_HEADER } from "@shared-constants";
import { SearchConditions } from "@shared-enums";
import { PaginationListItems } from "@shared-types";
import { filterToQueryParameter } from "@shared-utils";

export function mapPaginationResponseToListModel<T>(response: HttpResponse<T[]>): PaginationListItems<T> {
    const countHeader = response.headers.get(TOTAL_COUNT_HEADER);
    return {
        items: response.body ?? [],
        count: Number(countHeader),
    };
}

export function getPaginationRequestParams(): Record<string, string> {
    return {
        offset: filterToQueryParameter(SearchConditions.EQUAL, 0),
        limit: filterToQueryParameter(SearchConditions.EQUAL, 25),
    };
}