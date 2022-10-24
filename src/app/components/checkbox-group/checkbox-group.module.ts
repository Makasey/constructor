import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CheckboxGroup } from "./checkbox-group";

@NgModule({
    declarations: [CheckboxGroup],
  exports: [
    CheckboxGroup
  ],
    imports: [CommonModule],
})
export class CheckboxGroupModule {}
