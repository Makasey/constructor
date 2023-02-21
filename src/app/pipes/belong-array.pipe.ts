import { Color } from "../components";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "lzBelongArray",
    pure: true,
})
export class BelongArrayPipe implements PipeTransform {
    public transform(array: Color[], element: Color): boolean {
        return !!array.find(item => item.id === element.id);
    }
}
