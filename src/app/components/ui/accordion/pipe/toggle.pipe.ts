import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "lzGetToggleFunction",
    standalone: true,
})
export class TogglePipe implements PipeTransform {
    public transform(i: number, toggleFn: Function): () => void {
        return () => toggleFn(i);
    }
}
