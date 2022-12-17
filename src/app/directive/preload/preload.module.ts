import { NgModule } from "@angular/core";
import { PreloadDirective } from "./preload.directive";
import { PreloadTableComponent } from "../../components/preload-background";
import { CommonModule } from "@angular/common";

@NgModule({
    exports: [PreloadDirective, PreloadTableComponent],
    imports: [CommonModule],
    declarations: [PreloadDirective, PreloadTableComponent],
})
export class PreloadDirectiveModule {}
