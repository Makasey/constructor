import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { TableBodyComponent } from "./components/table-body/table-body.component";
import { TableComponent } from "./table.component";
import { TableHeadComponent } from "./components/table-head/table-head.component";
import { TableRowComponent } from "./components/table-row/table-row.component";

@NgModule({
    declarations: [TableBodyComponent, TableComponent, TableHeadComponent, TableRowComponent],
    exports: [TableComponent],
    imports: [CommonModule],
})
export class TableModule {}
