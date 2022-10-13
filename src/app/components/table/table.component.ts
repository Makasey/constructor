import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from "@angular/core";
import {LZTableMeta, LZTableValues, LZTemplatesMap} from "./types";

@Component({
    selector: 'lz-table',
    templateUrl: './table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
  }
)

export class TableComponent {

  @Input()
  public lzTableMeta: LZTableMeta[] = [];

  @Input()
  public lzTableValues: LZTableValues[] = [];

  @Input()
  public lzTemplatesMap: LZTemplatesMap = {};
}
