import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PreloadDirective } from "./preload.directive";
import { PreloadTableComponent } from "../../components/preload-background";

@NgModule({
    exports: [PreloadDirective, PreloadTableComponent],
    imports: [CommonModule],
    declarations: [PreloadDirective, PreloadTableComponent],
})
export class PreloadDirectiveModule {}
