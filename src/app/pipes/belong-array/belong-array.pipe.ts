import { Pipe, PipeTransform } from "@angular/core";

import { Color } from "../../components";

@Pipe({
    name: "lzBelongArray",
    pure: true,
})
export class BelongArrayPipe implements PipeTransform {
    public transform(array: Color[], element: Color, key: string): boolean {
        return !!array.find(item => item[key] === element[key]);
    }
}
