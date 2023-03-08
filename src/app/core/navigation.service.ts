import { Injectable } from "@angular/core";

@Injectable()
export abstract class AbstractNavigationService {
    public abstract buildLink(key: string, ids?: Record<string, string | number>): string;
}

@Injectable()
export class NavigationService extends AbstractNavigationService {
    private readonly projectLinksMap: Record<string, string[]> = {};

    public buildLink(key: string, ids: Record<string, string | number> = {}): string {
        const path = this.projectLinksMap[key].reduce((acc, item, index, array) => {
            const isLastItem = index === array.length - 1;
            const pathPart = ids[item] ? `${ids[item]}` : item;

            return acc + pathPart + (!isLastItem ? "/" : "");
        }, "");

        return path;
    }
}
