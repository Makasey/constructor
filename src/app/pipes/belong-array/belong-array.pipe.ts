import { Pipe, PipeTransform } from "@angular/core";

import { Color } from "@components/ui";

@Pipe({
    name: "lzBelongArray",
    pure: true,
    standalone: true,
})
export class BelongArrayPipe implements PipeTransform {
    public transform(array: Color[], element: Color, key: string): boolean {
        return !!array.find(item => item[key] === element[key]);
    }
}
