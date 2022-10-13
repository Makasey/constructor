import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {LZTableMeta, LZTableValues, LZTemplatesMap} from "../../types";

@Component({
  selector: 'lz-table-row',
  templateUrl: './table-row.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableRowComponent {

  @Input()
  public lzTableMeta!: LZTableMeta[];

  @Input()
  public lzTableValues!: LZTableValues[];

  @Input()
  public lzTemplatesMap!: LZTemplatesMap;

  @Input()
  public lzRowTemplate!: string;
}

