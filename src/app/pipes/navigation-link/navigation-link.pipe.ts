import { Pipe, PipeTransform, inject } from "@angular/core";

import { AbstractNavigationService } from "@core";
import { RouteKey } from "@shared-enums";

@Pipe({
    name: "lzNavigationLink",
    standalone: true,
    pure: true,
})
export class NavigationLinkPipe implements PipeTransform {
    private readonly navigationService = inject(AbstractNavigationService);

    public transform(key: RouteKey, ids: Record<string, string | number> = {}): string {
        return this.navigationService.buildLink(key, ids);
    }
}
