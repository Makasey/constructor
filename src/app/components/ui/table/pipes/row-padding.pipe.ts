import { Pipe, PipeTransform } from "@angular/core";

import { RowPaddingType, TableValueExtraInternalParams } from "@components";

@Pipe({
    name: "lzRowPadding",
    pure: true,
    standalone: true,
})
export class RowPaddingPipe implements PipeTransform {
    public transform(valueExtra: TableValueExtraInternalParams, type: RowPaddingType, hasCheckboxes: boolean): number {
        switch (type) {
            // eslint-disable-next-line no-fallthrough
            case RowPaddingType.CELL: {
                return (
                    ((valueExtra?.level ?? 1) - (valueExtra?.levelToShow ?? 0)) * 20 +
                    (valueExtra?.level !== valueExtra?.levelToShow && valueExtra.levelToShow ? 28 : 0) +
                    (!valueExtra?.hasChild && !valueExtra?.level ? 24 : 0) +
                    (valueExtra?.parentId && !valueExtra?.hasChild ? 24 : 0)
                );
            }

            // eslint-disable-next-line no-fallthrough
            case RowPaddingType.ARROW_LINE: {
                return (
                    (valueExtra?.level ?? 1) -
                    (valueExtra?.levelToShow ?? 0) * 20 +
                    (valueExtra?.levelToShow !== 0 ? 43 : 15) +
                    (hasCheckboxes ? 32 : 0)
                );
            }
        }
    }
}
