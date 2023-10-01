import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "lzImageLink",
    standalone: true,
    pure: true,
})
export class ImageLinkPipe implements PipeTransform {
    public transform(iconName: string, folderName: string): string {
        return `/assets/icons/${folderName}/${iconName}`;
    }
}
