import { APTextFieldModule, ControlItem } from "@components/ui";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "lz-items-control-item",
    standalone: true,
    imports: [CommonModule, APTextFieldModule, FormsModule],
    templateUrl: "./items-control-item.component.html",
    styleUrls: ["./items-control-item.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class ItemsControlItemComponent {
    @Input({ required: true })
    public item: ControlItem;

    @Output()
    public onUpdate: EventEmitter<ControlItem> = new EventEmitter<ControlItem>();

    @Output()
    public onDelete: EventEmitter<string> = new EventEmitter<string>();

    @Output()
    public onDuplicate: EventEmitter<string> = new EventEmitter<string>();

    public change(event: string): void {
        this.item = {
            ...this.item,
            title: event,
        };

        this.onUpdate.emit(this.item);
    }

    public duplicate(id: string): void {
        this.onDuplicate.emit(id);
    }

    public delete(id: string): void {
        this.onDelete.emit(id);
    }
}
