import { AbstractControl, ValidationErrors } from "@angular/forms";

export const linkPattern = /^(http|https):\/\/.+([.].{2,6})$/gm;

export function linkValidator({ value }: AbstractControl<string>): ValidationErrors | null {
    const linkRegExp = new RegExp(linkPattern);

    if (!linkRegExp.test(value)) {
        return {
            link: "Неккоректная ссылка",
        };
    }

    return null;
}
