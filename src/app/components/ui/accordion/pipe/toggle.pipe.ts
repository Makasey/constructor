import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    // eslint-disable-next-line @angular-eslint/pipe-prefix
    name: "getToggleFunction",
    standalone: true,
})
export class TogglePipe implements PipeTransform {
    public transform(i: number, toggleFn: Function): () => void {
        return () => toggleFn(i);
    }
}
