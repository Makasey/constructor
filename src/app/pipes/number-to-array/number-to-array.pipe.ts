import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "lzNumberToArray",
    pure: true,
})
export class NumberToArrayPipe implements PipeTransform {
    public transform(value: number): unknown[] {
        return new Array(value);
    }
}
