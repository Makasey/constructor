import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: "lzBelongArray",
    pure: true,
    standalone: true,
})
export class BelongArrayPipe implements PipeTransform {
    public transform(array: unknown[], element: unknown, key: string): boolean {
        return !!array.find(item => (item as Record<string, unknown>)[key] === (element as Record<string, unknown>)[key]);
    }
}
