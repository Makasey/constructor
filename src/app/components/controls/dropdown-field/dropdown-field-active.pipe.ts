import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "lzDropdownActive",
    pure: true,
})
export class APDropdownFieldActivePipe implements PipeTransform {
    public transform(id: string, items: { id: string; active: boolean; }[]): boolean {
        return !!items.find(item => item.id === id)?.active;
    }
}
