import { Pipe, PipeTransform } from "@angular/core";

import { APDropdownFieldItem } from "./types";

@Pipe({
    name: "lzDropdownActive",
    pure: true,
})
export class APDropdownFieldActivePipe implements PipeTransform {
    public transform(id: string, items: APDropdownFieldItem[], valueKey: string): boolean {
        console.log(items, valueKey);
        return !!items.find(item => item[valueKey] === id);
    }
}
