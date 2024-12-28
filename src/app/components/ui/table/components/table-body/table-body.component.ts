import { ChangeDetectionStrategy, Component, HostBinding, input, output } from "@angular/core";

import { LZTableRowComponent, TableExtra, TableMeta, TableRow, TableValueExtraInternal, TemplateMap } from "@components";
import { TrackByFn } from "../../interfaces";
import { coerceNullableArray, coerceNullableObject, transformTrackBy } from "../../transformers/table.transformers";
import { defaultTrackBy } from "../../constants";

@Component({
    selector: "lz-table-body",
    templateUrl: "./table-body.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [LZTableRowComponent]
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

    public tableExtra = input<Partial<TableExtra>, Partial<TableExtra> | null>(
        {},
        {
            transform: coerceNullableObject,
        },
    );

    public valuesExtra = input<TableValueExtraInternal, TableValueExtraInternal | null>(
        {},
        {
            transform: coerceNullableObject,
        },
    );

    public trackByRow = input<TrackByFn, TrackByFn | null>(defaultTrackBy, {
        transform: transformTrackBy,
    });

    public readonly rowScrolledBottom = output<boolean>();

    public onBottomScrolled(event: boolean): void {
        this.rowScrolledBottom.emit(event);
    }
}
