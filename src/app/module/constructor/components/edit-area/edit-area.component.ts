import { CdkDragDrop, CdkDropList } from "@angular/cdk/drag-drop";
import { ChangeDetectionStrategy, Component, HostBinding, Signal, ViewEncapsulation, computed, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";

import {
    AbstractDragService,
    AbstractMultiPageOperationService,
    EDITOR_SELECTED_ELEMENT,
    EDITOR_SELECTED_PAGE,
    ElementButton,
    PagesBarComponent,
    ROOT_ELEMENT_ID,
    RootComponent,
} from "@modules/constructor";
import { Page } from "@core";

@Component({
    selector: "lz-edit-area",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./edit-area.component.scss"],
    templateUrl: "./edit-area.component.html",
    standalone: true,
    imports: [RootComponent, PagesBarComponent, CdkDropList],
})
export class EditAreaComponent {
    @HostBinding("class.lz-edit-area")
    public hostClass = true;

    public readonly selectedPage: Signal<string> = inject(EDITOR_SELECTED_PAGE);

    public readonly connectedDropListsIds = inject(AbstractDragService).getConnectedDropListsId();

    public readonly selectedElement: Signal<string> = inject(EDITOR_SELECTED_ELEMENT);

    private readonly service = inject(AbstractMultiPageOperationService);

    public pages: Signal<Page[]> = toSignal(this.service.selectPages(), { initialValue: [] });

    public isRootElement: Signal<boolean> = computed(() => this.selectedElement() === ROOT_ELEMENT_ID);

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

    public onDrop(_: CdkDragDrop<string, string, ElementButton>): void {
        // const { item, container } = event;
        // const { data } = item;
        // const { type } = data;
        // if (this.isRootElement()) {
        //     this.actionService.addPageElement(type);
        //
        //     return;
        // }
        //
        // this.actionService.addElementByType(type, container.data);
    }
}
