import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { CheckboxGroupComponent } from "./checkbox-group.component";

@NgModule({
    declarations: [CheckboxGroupComponent],
    exports: [CheckboxGroupComponent],
    imports: [CommonModule],
})
export class CheckboxGroupModule {}
