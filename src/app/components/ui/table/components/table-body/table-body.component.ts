import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Output, input, WritableSignal } from "@angular/core";

import { TableExtra, TableMeta, TableRow, TableValueExtraInternal, TemplateMap } from "@components";
import { defaultTrackBy } from "../../constants";
import { coerceNullableArray, coerceNullableObject, transformTrackBy } from "../../transformers/table.transformers";

@Component({
    selector: "lz-table-body",
    templateUrl: "./table-body.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableBodyComponent {
    @HostBinding("class.table-body")
    public hostClass = true;

    public templateMap: WritableSignal<TemplateMap> = input({});

    public tableMeta: WritableSignal<TableMeta[]> = input([], {
        transform: coerceNullableArray,
    });

    public tableRows: WritableSignal<TableRow[]> = input([], {
        transform: coerceNullableArray,
    });

    public tableExtra: WritableSignal<Partial<TableExtra>> = input({}, {
        transform: coerceNullableObject,
    });

    public valuesExtra: WritableSignal<TableValueExtraInternal> = input({}, {
        transform: coerceNullableObject,
    });

    public trackByRow = input(defaultTrackBy, {
        transform: transformTrackBy,
    })

    @Output()
    public rowScrolledBottom: EventEmitter<boolean> = new EventEmitter<boolean>();

    public onBottomScrolled(event: boolean): void {
        this.rowScrolledBottom.emit(event);
    }
}
