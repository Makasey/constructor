import {
    AbstractMultiPageOperationService,
    EDITOR_SELECTED_ELEMENT,
    EDITOR_SELECTED_PAGE,
    PagesBarComponent,
    RootComponent,
} from "@modules/constructor";
import { AsyncPipe, JsonPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostBinding, Signal, ViewEncapsulation, inject } from "@angular/core";
import { Page } from "@core";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
    selector: "lz-edit-area",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./edit-area.component.scss"],
    templateUrl: "./edit-area.component.html",
    imports: [JsonPipe, AsyncPipe, RootComponent, PagesBarComponent]
})
export class EditAreaComponent {
    @HostBinding("class.lz-edit-area")
    public hostClass = true;

    public readonly selectedPage: Signal<string> = inject(EDITOR_SELECTED_PAGE);

    public readonly selectedElement: Signal<string> = inject(EDITOR_SELECTED_ELEMENT);

    private readonly service = inject(AbstractMultiPageOperationService);

    public pages: Signal<Page[]> = toSignal(this.service.selectPages(), { initialValue: [] });

    public addPage(): void {
        this.service.addPage();
    }

    public copyPage(id: string): void {
        this.service.copyPageById(id);
    }

    public deletePage(id: string): void {
        this.service.deletePageById(id);
    }

    public selectPage(id: string): void {
        this.service.updateSelectPage(id);
    }
}
