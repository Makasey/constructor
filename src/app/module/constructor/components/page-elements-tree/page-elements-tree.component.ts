import { ChangeDetectionStrategy, Component, HostBinding, Signal, ViewEncapsulation, computed, inject } from "@angular/core";
import { map } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";

import {
    AbstractEditorElementActionsService,
    AbstractEditorSelectionService,
    AbstractMultiPageOperationService,
    SectionPageElement,
    SitePageElement,
    mapElementsToTreeModel,
} from "@modules/constructor";
import { Tree, TreeComponent } from "@components/ui/tree/tree.component";

@Component({
    selector: "lz-page-elements-tree",
    templateUrl: "./page-elements-tree.component.html",
    styleUrl: "./page-elements-tree.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [TreeComponent],
    standalone: true,
})
export class PageElementsTreeComponent {
    @HostBinding("class.lz-page-elements-tree")
    public hostClass = true;

    private readonly multiPageOperationService = inject(AbstractMultiPageOperationService);

    private readonly service = inject(AbstractEditorElementActionsService<SectionPageElement>);

    private readonly selectionService = inject(AbstractEditorSelectionService);

    public rootElements: Signal<string[]> = toSignal(this.service.selectPageElements(), { initialValue: [] as string[] });

    public items: Signal<Record<string, SitePageElement>> = toSignal(this.service.selectItems(), {
        initialValue: {} as Record<string, SitePageElement>,
    });

    public pageTitle: Signal<string> = toSignal(
        this.multiPageOperationService.selectActivePage().pipe(map(page => this.service.getElement(page)?.settings?.title)),
        {
            initialValue: "",
        },
    );

    public elements: Signal<Tree[]> = computed(() => {
        return this.rootElements()
            .map(element => ({
                ...mapElementsToTreeModel(this.items(), element)!,
            }))
            .filter(Boolean);
    });

    public updateSelection(item: Tree): void {
        this.selectionService.updateSelection(item.value);
    }
}
