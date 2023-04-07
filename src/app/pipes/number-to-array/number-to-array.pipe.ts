import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "lzNumberToArray",
    pure: true,
})
export class NumberToArrayPipe implements PipeTransform {
    public transform(value: number): number[] {
        return new Array(value).map((_, index) => index + 1);
    }
}
