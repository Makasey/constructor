import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from "@angular/core";
import { LZTableMeta, LZTableValues, LZTemplatesMap } from "./types";

@Component({
    selector: "lz-table",
    templateUrl: "./table.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class TableComponent {
  @Input()
    public tableMeta: LZTableMeta[] = [];

  @Input()
  public tableValues: LZTableValues[] = [];

  @Input()
  public templatesMap: LZTemplatesMap = {};
}
