import {TemplateRef} from "@angular/core";

export type LZTableMeta = Readonly<{
  label?: string;
  fieldKey: string;
  templateKey?: string;
  customClass?: string;
}>;

export type LZTableValues = Readonly<{
  [key: string]: unknown;
}>;

export type LZTemplatesMap = Readonly<Record<string, TemplateRef<unknown>>>;


