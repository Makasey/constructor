import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Output, input } from "@angular/core";

import { LZTableRowComponent, TableExtra, TableMeta, TableRow, TableValueExtraInternal, TemplateMap } from "@components";
import { defaultTrackBy } from "../../constants";
import { TrackByFn, TransformFn } from "../../interfaces";
import { coerceNullableArray, coerceNullableObject, transformTrackBy } from "../../transformers/table.transformers";

@Component({
    selector: "lz-table-body",
    templateUrl: "./table-body.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [LZTableRowComponent],
})
export class LZTableBodyComponent {
    @HostBinding("class.table-body")
    public hostClass = true;

    public templateMap = input<TemplateMap>({});

    public tableMeta = input<TableMeta[], TableMeta[] | null>([], {
        transform: coerceNullableArray,
    });

    public tableRows = input<TableRow[], TableRow[] | null>([], {
        transform: coerceNullableArray,
    });

    public tableExtra = input<Partial<TableExtra>, Partial<TableExtra> | null>({}, {
        transform: coerceNullableObject,
    });

    public valuesExtra = input<TableValueExtraInternal, TableValueExtraInternal | null>({}, {
        transform: coerceNullableObject,
    });

    public trackByRow = input<TrackByFn, TrackByFn | null>(defaultTrackBy, {
        transform: transformTrackBy,
    })

    @Output()
    public rowScrolledBottom: EventEmitter<boolean> = new EventEmitter<boolean>();

    public onBottomScrolled(event: boolean): void {
        this.rowScrolledBottom.emit(event);
    }
}
