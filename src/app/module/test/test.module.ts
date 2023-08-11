import { CommonModule } from "@angular/common";
import { LzStateKey } from "@core/store/lz.state";
import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { TestComponent } from "./test.component";
import { TreeComponent } from "@components/ui/tree/tree.component";
import { createStoreProviders } from "@core/store/abstract/create-store-providers";

const ROUTES: Route[] = [
    {
        path: "",
        component: TestComponent,
    },
];

@NgModule({
    declarations: [TestComponent],
    imports: [CommonModule, RouterModule.forChild(ROUTES), TreeComponent],
    exports: [RouterModule],
    providers: [...createStoreProviders<LzStateKey.TEST_STATE>(LzStateKey.TEST_STATE)],
})
export class TestModule {}
