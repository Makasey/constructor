import { ChangeDetectionStrategy, Component, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

export interface list {
    label: string;
    value: number;
}

@Component({
    selector: "checkbox-group",
    templateUrl: "./checkbox-group.html",
    styleUrls: ["./checkbox-group.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxGroup),
            multi: true,
        },
    ],
})
export class CheckboxGroup implements ControlValueAccessor {
    @Input() public list: list[] = [
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

    @Input() label: string = "Диаметр букета";

    @Input() columnDirection: boolean = false;

    private value: number[] = [];
    private onChange = (value: number[]) => {};
    private onTouched = () => {};

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

        if (index > -1) {
            this.value = [...this.value.slice(0, index), ...this.value.slice(index + 1)];
        } else {
            this.value = [...this.value, selectedValue];
        }

        this.onChange(this.value);
        this.onTouched();

        // todo for test
        console.log(this.value);
    }

    public isSelected(valueToCheck: number): boolean {
        return this.value.includes(valueToCheck);
    }

    public checkChanges(index: number, item: list): number {
        return item.value;
    }
}
