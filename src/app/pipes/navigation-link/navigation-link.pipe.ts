import { Pipe, PipeTransform, inject } from "@angular/core";

import { AbstractNavigationService } from "@core/navigation.service";

@Pipe({
    name: "lzNavigationLink",
    standalone: true,
    pure: true,
})
export class NavigationLinkPipe implements PipeTransform {
    private readonly navigationService = inject(AbstractNavigationService);

    public transform(key: string, ids: Record<string, string | number> = {}): any {
        return this.navigationService.buildLink(key, ids);
    }
}
