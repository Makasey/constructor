import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "lzBelongArray",
    pure: true,
})
export class BelongArrayPipe implements PipeTransform {

    public transform(array: unknown[], element: unknown): boolean {
        return array.includes(element);
    }

}
