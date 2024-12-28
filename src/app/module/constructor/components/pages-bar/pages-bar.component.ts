import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation, input, output } from "@angular/core";
import { NgClass } from "@angular/common";
import { Page } from "@core";

@Component({
    selector: "lz-pages-bar",
    templateUrl: "./pages-bar.component.html",
    styleUrl: "./pages-bar.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [NgClass]
})
export class PagesBarComponent {
    @HostBinding("class.pages-bar")
    public hostClass = true;

    public readonly items = input<Page[]>();

    public readonly activeItem = input<string>();

    public readonly addItem = output<void>();

    public readonly copyItem = output<string>();

    public readonly deleteItem = output<string>();

    public readonly selectPage = output<string>();

    public add(): void {
        this.addItem.emit();
    }

    public copy(id: string): void {
        this.copyItem.emit(id);
    }

    public delete(id: string): void {
        this.deleteItem.emit(id);
    }

    public select(id: string): void {
        this.selectPage.emit(id);
    }
}
