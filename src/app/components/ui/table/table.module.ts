import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

import { DragDropModule } from "@angular/cdk/drag-drop";
import { OverlayModule } from "@angular/cdk/overlay";

// import { PageLoaderModule } from "@ui/page-loader/page-loader.module";
// import { CheckboxModule } from "@ui/checkbox/checkbox.module";
import { LZInitVarDirective } from "@shared-directives/init-var/init-var.directive";
import { RowPaddingPipe, TableBodyComponent, TableComponent, TableFootComponent, TableHeadComponent, TableRowComponent } from "@components/ui";

@NgModule({
    imports: [CommonModule, DragDropModule, FormsModule, LZInitVarDirective, OverlayModule, RowPaddingPipe],
    declarations: [TableBodyComponent, TableComponent, TableFootComponent, TableHeadComponent, TableRowComponent],
    exports: [TableComponent],
})
export class LzTableModule {}
