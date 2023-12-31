import { AbstractControlOptions } from "@angular/forms";

import { UpsertConfig } from "@ngneat/forms-manager/lib/types";

import { ApDropdownFormControlOptions, ApNumberFormControlOptions, ApTextFormControlOptions } from "@components";

export enum APFormDefaultTemplateKeys {
    TEXT_FIELD = "textFieldTemplate",
    NUMBER_FIELD = "numberFieldTemplate",
    DROPDOWN_FIELD = "dropdownFieldTemplate",
    RANGE_FIELD_WITH_UNIT_FIELD = "rangeFieldWithUnitTemplate",
    COLOR_FIELD = "colorPickerTemplate",
    FILE_UPLOAD = "fileUploadTemplate",
    TEXTAREA_FIELD = "textAreaFieldTemplate",
    NUMBER_WITH_DROPDOWN_FIELD = "numberWithDropdownField",
    DIRECTION_FIELD = "directionFieldTemplate",
    RANGE_FIELD = "rangeFieldTemplate",
    RADIO_GROUP_FIELD = "radioGroupField",
    IMAGE_UPLOAD_FIELD = "imageUploadField",
    ITEMS_CONTROL_FIELD = "itemsControlField",
    BACKGROUND_FIELD = "backgroundColor",
    BORDER_FIELD = "borderField",
}

export type APFormModel = {
    id: string;
    name: string;
    styleClass?: string;
    upsertConfig?: UpsertConfig;
    headerText?: string;
    mapperFn?: (data: unknown) => unknown;
    isFormArray?: boolean;
    innerGroups?: APFormModel[];
    controls: (APFormControl | APFormControl[])[];
} & AbstractControlOptions;

export interface ApFormInnerModel extends APFormModel {
    readonly innerControls: ApFormControlInner[];
    readonly gridAreas: string;
    readonly path?: string[];
    readonly innerGroups?: ApFormInnerModel[];
    readonly firstColumnLength: number;
}

export interface ApFormControlInner extends APFormControl {
    readonly path: string[];
    readonly gridClass: string;
}

export type APFormControl<T = unknown> = {
    name: string;
    id?: string;
    value?: T | T[];
    defaultValue?: T | T[];
    valueTemplateKey?: APFormDefaultTemplateKeys | string;
    disabled?: boolean;
    required?: boolean;
    options?: APFormOptions;
    hidden?: boolean;
    controlClass?: string;
    styleClass?: string;
} & AbstractControlOptions;

export function gridAreasFromColumns(columns: { gridClass: string }[][]): string {
    const gridAreas = [];
    let j = 0;
    while (columns?.some(it => !!it[j])) {
        let gridRow = columns.reduce((result, next) => {
            return `${result}${next[j]?.gridClass ?? "."} `;
        }, "");
        gridRow = `"${gridRow.substring(0, gridRow.length - 1)}"`;
        gridAreas.push(gridRow);
        j++;
    }
    return gridAreas.join(" ");
}

export type APFormOptions =
    | Readonly<{
          title?: string;
          titleClass?: string;
          label?: string;

          [key: string]: unknown;
      }>
    | ApTextFormControlOptions
    | ApNumberFormControlOptions
    | ApDropdownFormControlOptions<unknown>;
