import {APDropdownFieldModule, APNumberFieldModule, APTextFieldModule} from "../controls";
import {APFormComponent} from "./form.component";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";

const AP_MODULES = [APTextFieldModule, APNumberFieldModule, APDropdownFieldModule];

@NgModule({
    declarations: [APFormComponent],
    imports: [CommonModule, ReactiveFormsModule, ...AP_MODULES],
    exports: [APFormComponent],
})
export class APFormModule {}
