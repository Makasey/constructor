import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import { TestComponent } from "./test.component";

const ROUTES: Route[] = [
    {
        path: "",
        component: TestComponent,
    },
];

@NgModule({
    declarations: [
        TestComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
    ],
    exports: [RouterModule],
})
export class TestModule { }
