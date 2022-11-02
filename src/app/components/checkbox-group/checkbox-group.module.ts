import { CheckboxGroupComponent} from "./checkbox-group";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
    declarations: [CheckboxGroupComponent],
    exports: [
        CheckboxGroupComponent,
    ],
    imports: [CommonModule],
})
export class CheckboxGroupModule {}
