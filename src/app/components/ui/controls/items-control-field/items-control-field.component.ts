import { APFormControl, ControlItem, ItemsControlItemComponent } from "@components";
import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation, input, output } from "@angular/core";
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";

import { getRandomId } from "@shared-utils";

@Component({
    selector: "lz-items-control-field",
    templateUrl: "./items-control-field.component.html",
    styleUrls: ["./items-control-field.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: ItemsControlFieldComponent,
        },
    ],
    imports: [ItemsControlItemComponent],
})
export class ItemsControlFieldComponent implements ControlValueAccessor {
    @HostBinding("class.lz-items-control-field")
    public hostClass = true;

    public readonly nativeControl = input<FormControl>();

    public readonly controlModel = input<APFormControl>();

    public readonly label = input("");

    @Input() public set value(value: ControlItem[]) {
        this._value = value;
    }

    public readonly defaultItemFn = input.required<() => ControlItem>();

    public readonly onValueChange = output<ControlItem[]>();

    public _value: ControlItem[] = [];

    public isDisabled = false;

    private onChange: (value: ControlItem[]) => void;

    private onTouched: () => void;

    public registerOnChange(fn: (value: ControlItem[]) => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    public writeValue(obj: ControlItem[]): void {
        this.value = obj;
    }

    public delete(id: string): void {
        this.value = this._value.filter(item => item.id !== id);

        this.emitEvent();
    }

    public update(updatedItem: ControlItem): void {
        this.value = this._value.map(item => {
            if (updatedItem.id === item.id) {
                return updatedItem;
            }

            return item;
        });

        this.emitEvent();
    }

    public duplicate(id: string): void {
        const element = this._value.find(item => item.id === id);

        if (!element) {
            return;
        }

        const newElement = { ...element, title: element.title + "-копия", id: getRandomId(), duplicatedId: id };

        this.value = [...this._value, newElement];

        this.emitEvent();
    }

    public addItem(): void {
        const item = { ...this.defaultItemFn()(), id: getRandomId() };

        this.value = [...this._value, item];

        this.emitEvent();
    }

    public emitEvent(): void {
        this.onChange(this._value);
        this.onTouched();
        this.onValueChange.emit(this._value);
    }
}
