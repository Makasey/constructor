import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LZTableMeta, LZTableValues, LZTemplatesMap } from '../../types';

@Component({
  selector: 'lz-table-body',
  templateUrl: './table-body.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableBodyComponent {
  @Input()
  public tableMeta!: LZTableMeta[];

  @Input()
  public tableValues!: LZTableValues[];

  @Input()
  public templatesMap!: LZTemplatesMap;
}
