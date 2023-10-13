import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

import { DragDropModule } from "@angular/cdk/drag-drop";
import { OverlayModule } from "@angular/cdk/overlay";

import { LZInitVarDirective } from "@shared-directives";
import {
    LZLoaderComponent,
    RowPaddingPipe,
    TableBodyComponent,
    TableComponent,
    TableFootComponent,
    TableHeadComponent,
    TableRowComponent,
} from "@components";

@NgModule({
    imports: [CommonModule, DragDropModule, FormsModule, LZInitVarDirective, LZLoaderComponent, OverlayModule, RowPaddingPipe],
    declarations: [TableBodyComponent, TableComponent, TableFootComponent, TableHeadComponent, TableRowComponent],
    exports: [TableComponent],
})
export class LzTableModule {}
