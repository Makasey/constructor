import { AbstractEditorElementActionsService, AbstractEditorSelectionService, SectionPageElement, SitePageElement } from "@modules/constructor";
import { ChangeDetectionStrategy, Component, HostBinding, Signal, computed, inject } from "@angular/core";
import { Tree, TreeComponent } from "@components/ui/tree/tree.component";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
    selector: "lz-page-elements-tree",
    templateUrl: "./page-elements-tree.component.html",
    styleUrl: "./page-elements-tree.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [TreeComponent],
})
export class PageElementsTreeComponent {
    @HostBinding("class.lz-page-elements-tree")
    public hostClass = true;

    private readonly service = inject(AbstractEditorElementActionsService<SectionPageElement>);

    private readonly selectionService = inject(AbstractEditorSelectionService);

    public rootElements: Signal<string[]> = toSignal(this.service.selectPageElements(), { initialValue: [] as string[] });

    public items: Signal<Record<string, SitePageElement> | undefined> = toSignal(this.service.getItems());

    public elements: Signal<Tree[]> = computed(() => {
        return this.rootElements().map(element => ({
            ...this.mapElementsToTreeModel(this.items()!, element),
        }));
    });

    public mapElementsToTreeModel(items: Record<string, SitePageElement>, element: string): Tree {
        const { id, children, type } = items[element];

        return {
            value: id,
            label: type,
            children: children.map(child => {
                return this.mapElementsToTreeModel(items, child);
            }),
        };
    }

    public updateSelection(item: Tree): void {
        this.selectionService.updateSelection(item.value);
    }
}
