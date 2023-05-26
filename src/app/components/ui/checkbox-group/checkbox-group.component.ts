import { ChangeDetectionStrategy, Component, Input, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

import { CheckboxItem } from "./types";

@Component({
    selector: "lz-checkbox-group",
    templateUrl: "./checkbox-group.component.html",
    styleUrls: ["./checkbox-group.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxGroupComponent),
            multi: true,
        },
    ],
})
export class CheckboxGroupComponent implements ControlValueAccessor {
    @Input() public list: CheckboxItem[] = [
        {
            label: "До 25 см",
            value: 1,
        },
        {
            label: "26-40 см",
            value: 2,
        },
        {
            label: "41-55 см",
            value: 3,
        },
        {
            label: "Более 55 см",
            value: 4,
        },
    ];

    @Input() public label: string;

    @Input() public columnDirection = false;

    private value: number[] = [];
    private onChange: (value: number[]) => void = () => undefined;
    private onTouched: () => unknown = () => ({});

    public writeValue(value: number[]): void {
        this.value = value;
    }

    public registerOnChange(fn: (value: number[]) => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    public toggleValue(selectedValue: number): void {
        const index = this.value.indexOf(selectedValue);

        index > -1 ? (this.value = [...this.value.slice(0, index), ...this.value.slice(index + 1)]) : (this.value = [...this.value, selectedValue]);

        this.onChange(this.value);
        this.onTouched();
    }

    public isSelected(valueToCheck: number): boolean {
        return this.value.includes(valueToCheck);
    }

    public checkChanges(index: number, item: CheckboxItem): number {
        return item.value;
    }
}
