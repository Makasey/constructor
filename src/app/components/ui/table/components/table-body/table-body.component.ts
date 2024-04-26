import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Output, input, WritableSignal } from "@angular/core";

import { LZTableRowComponent, TableExtra, TableMeta, TableRow, TableValueExtraInternal, TemplateMap } from "@components";
import { defaultTrackBy } from "../../constants";
import { TrackByFn } from "../../interfaces";
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

    public templateMap: WritableSignal<TemplateMap> = input<TemplateMap>({});

    public tableMeta: WritableSignal<TableMeta[]> = input<TableMeta[]>([], {
        transform: coerceNullableArray,
    });

    public tableRows: WritableSignal<TableRow[]> = input<TableRow[]>([], {
        transform: coerceNullableArray,
    });

    public tableExtra: WritableSignal<Partial<TableExtra>> = input<Partial<TableExtra>>({}, {
        transform: coerceNullableObject,
    });

    public valuesExtra: WritableSignal<TableValueExtraInternal> = input<TableValueExtraInternal>({}, {
        transform: coerceNullableObject,
    });

    public trackByRow = input<TrackByFn>(defaultTrackBy, {
        transform: transformTrackBy,
    })

    @Output()
    public rowScrolledBottom: EventEmitter<boolean> = new EventEmitter<boolean>();

    public onBottomScrolled(event: boolean): void {
        this.rowScrolledBottom.emit(event);
    }
}
