import {APDropdownFieldItem} from "./types";
import {Pipe, PipeTransform} from "@angular/core";


@Pipe({
    name: "lzDropdownLabel",
    pure: true,
})
export class APDropdownFieldLabelPipe implements PipeTransform {
    public transform(value: APDropdownFieldItem[]): string {
        return value.map(item => item.label).join(", ");
    }
}
