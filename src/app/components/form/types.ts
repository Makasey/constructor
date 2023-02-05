import { AbstractControlOptions } from "@angular/forms";
import { UpsertConfig } from "@ngneat/forms-manager/lib/types";

export enum APFormDefaultTemplateKeys {
    TEXT_FIELD = "textFieldTemplate",
    NUMBER_FIELD = "numberFieldTemplate",
    DROPDOWN_FIELD = "dropdownFieldTemplate",
}

export type APFormModel = {
    id?: string;
    name: string;
    styleClass?: string;
    upsertConfig?: UpsertConfig;
    headerText?: string;
    controls: APFormControl[];
} & AbstractControlOptions;

export type APFormControl<T = any> = {
    name: string;
    id?: string;
    value?: T | T[];
    defaultValue?: T | T[];
    valueTemplateKey?: APFormDefaultTemplateKeys | string;
    disabled?: boolean;
    required?: boolean;
    options?: APFormOptions;
    styleClass?: string;
} & AbstractControlOptions;

export type APFormOptions = Record<string, unknown>;
