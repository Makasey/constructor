import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {LZTableMeta, LZTableValues, LZTemplatesMap} from "../../types";

@Component({
  selector: 'lz-table-row',
  templateUrl: './table-row.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableRowComponent {

  @Input()
  public tableMeta!: LZTableMeta[];

  @Input()
  public tableValues!: LZTableValues[];

  @Input()
  public templatesMap!: LZTemplatesMap;

  @Input()
  public rowTemplate!: string;
}

