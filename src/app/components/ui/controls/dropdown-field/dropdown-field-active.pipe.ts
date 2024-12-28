import { Pipe, PipeTransform } from "@angular/core";

import { APDropdownFieldItem } from "./types";

@Pipe({
    name: "lzDropdownActive",
    pure: true,
})
export class APDropdownFieldActivePipe implements PipeTransform {
    public transform(id: unknown, items: APDropdownFieldItem[], valueKey: string): boolean {
        return !!items.find(item => item[valueKey] === id);
    }
}
