import { Injectable } from "@angular/core";

import { RouteKey, RouteParams, RoutePaths } from "@shared-types/routes/route-paths";
import { SimpleMap } from "@shared-types/common/common";

@Injectable()
export abstract class AbstractNavigationService {
    public abstract buildLink(key: string, ids?: SimpleMap<string | number>): string;
}

@Injectable()
export class NavigationService extends AbstractNavigationService {
    private readonly projectLinksMap: Record<RouteKey, string[]> = {
        [RouteKey.ABOUT]: [RoutePaths.HOME, RoutePaths.ABOUT],
        [RouteKey.ACCOUNT]: [RoutePaths.HOME, RoutePaths.ACCOUNT],
        [RouteKey.BLOG]: [RoutePaths.HOME, RoutePaths.BLOG],
        [RouteKey.CATALOG]: [RoutePaths.HOME, RoutePaths.CATALOG, RouteParams.CATEGORY_ID],
        [RouteKey.HOME]: [RoutePaths.HOME],
        [RouteKey.INFO]: [RoutePaths.HOME, RoutePaths.INFO],
        [RouteKey.ORDER]: [RoutePaths.HOME, RoutePaths.ORDER],
        [RouteKey.PRODUCT]: [RoutePaths.HOME, RoutePaths.CATALOG, RouteParams.CATEGORY_ID, RouteParams.PRODUCT_ID],
        [RouteKey.TESTIMONIALS]: [RoutePaths.HOME, RoutePaths.TESTIMONIALS],
        [RouteKey.PERSON]: [RoutePaths.HOME, RoutePaths.ACCOUNT, RoutePaths.PERSON],
        [RouteKey.ADDRESSES]: [RoutePaths.HOME, RoutePaths.ACCOUNT, RoutePaths.ADDRESSES],
        [RouteKey.SALES]: [RoutePaths.HOME, RoutePaths.ACCOUNT, RoutePaths.SALES],
        [RouteKey.SETTINGS]: [RoutePaths.HOME, RoutePaths.ACCOUNT, RoutePaths.SETTINGS],
        [RouteKey.NOTIFICATIONS]: [RoutePaths.HOME, RoutePaths.ACCOUNT, RoutePaths.NOTIFICATIONS],
        [RouteKey.ORDERS]: [RoutePaths.HOME, RoutePaths.ACCOUNT, RoutePaths.ORDERS],
    };

    public buildLink(key: string, ids: SimpleMap<string | number> = {}): string {
        if (!key) {
            return "";
        }

        if (!this.projectLinksMap[key]) {
            return "";
        }

        const path = (this.projectLinksMap[key] as string[]).reduce<string>((acc: string, item: string, index: number, array: string[]) => {
            const isLastItem = index === array.length - 1;
            const pathPart = ids[item] ? `${ids[item]}` : item;

            return acc + pathPart + (!isLastItem && pathPart !== "/" ? "/" : "");
        }, "");

        return path;
    }
}
