import {NgModule} from "@angular/core";
import {TableComponent} from "./table.component";
import {CommonModule} from "@angular/common";
import {TableBodyComponent} from "./components/table-body/table-body.component";
import {TableHeadComponent} from "./components/table-head/table-head.component";
import {TableRowComponent} from "./components/table-row/table-row.component";

@NgModule({
  declarations: [
    TableComponent,
    TableBodyComponent,
    TableHeadComponent,
    TableRowComponent,
  ],
  exports: [
    TableComponent,
  ],
  imports: [
    CommonModule,
  ],
})

export class TableModule {

}
