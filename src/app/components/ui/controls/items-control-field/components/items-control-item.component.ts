import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation, input, output } from "@angular/core";
import { ControlItem } from "@components/ui";

import { APTextFieldComponent } from "@components/ui";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "lz-items-control-item",
    imports: [APTextFieldComponent, FormsModule],
    templateUrl: "./items-control-item.component.html",
    styleUrls: ["./items-control-item.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class ItemsControlItemComponent {
    @HostBinding("class.lz-items-control-item")
    public hostClass = true;

    public readonly item = input.required<ControlItem>();

    public readonly onUpdate = output<ControlItem>();

    public readonly onDelete = output<string>();

    public readonly onDuplicate = output<string>();

    public change(event: string): void {
        this.onUpdate.emit({ ...this.item(), title: event });
    }

    public duplicate(id: string): void {
        this.onDuplicate.emit(id);
    }

    public delete(id: string): void {
        this.onDelete.emit(id);
    }
}
