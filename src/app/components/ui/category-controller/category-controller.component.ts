import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

import { CategoryListItem } from "./types";

@Component({
    selector: "lz-category-controller",
    templateUrl: "./category-controller.component.html",
    styleUrls: ["./category-controller.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CategoryControllerComponent),
            multi: true,
        },
    ],
})
export class CategoryControllerComponent implements ControlValueAccessor {
    @Input() public set value(value: number) {
        this.category = value;
    }

    @Input() public list: CategoryListItem[] = [
        {
            label: "Местные розы",
            value: 1,
        },
        {
            label: "Эквадорские розы",
            value: 2,
        },
        {
            label: "Кенийские розы",
            value: 3,
        },
    ];

    @Output() public readonly valueChange: EventEmitter<number> = new EventEmitter<number>();

    public category: number;
    private onChange: (value: number) => void = () => undefined;
    private onTouched: () => unknown = () => ({});

    public writeValue(value: number): void {
        this.category = value;
    }

    public registerOnChange(fn: (value: number) => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    public changeValue(value: number): void {
        this.onChange(value);
        this.writeValue(value);
        this.valueChange.emit(value);
    }
}
