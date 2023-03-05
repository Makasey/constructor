import {APTextFieldComponent} from "./text-field.component";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [APTextFieldComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    exports: [APTextFieldComponent],
})
export class APTextFieldModule {}
