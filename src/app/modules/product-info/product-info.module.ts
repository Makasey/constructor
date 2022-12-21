import { CommonModule } from "@angular/common";
import { LzProductInfoComponent} from "src/app/modules/product-info/product-info.component";
import { NgModule } from "@angular/core";
import { RouterModule} from "@angular/router";


@NgModule({
    declarations: [
        LzProductInfoComponent,
    ],
    imports: [
        CommonModule,
    ],
    exports: [RouterModule, LzProductInfoComponent],
})
export class LzProductInfotModule { }
