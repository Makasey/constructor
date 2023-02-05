import {Injectable} from "@angular/core";

@Injectable()
export abstract class AbstractNavigationService {
    public abstract buildLink(key: string, id?: string): string;
}

@Injectable()
export class NavigationService extends AbstractNavigationService {
    private readonly projectLinksMap: Record<string, string[]> = {};

    public buildLink(key: string, id?: string): string {
        let path = this.projectLinksMap[key].join("");

        if (id) {
            path += id;
        }

        return path ? path : "";
    }
}
