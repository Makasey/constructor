import {
    AbstractEditorElementActionsService,
    AbstractEditorSelectionService,
    SectionPageElement,
    SitePageElement,
    mapElementsToTreeModel,
} from "@modules/constructor";
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

    public items: Signal<Record<string, SitePageElement> | undefined> = toSignal(this.service.selectItems());

    public elements: Signal<Tree[]> = computed(() => {
        return this.rootElements().map(element => ({
            ...mapElementsToTreeModel(this.items()!, element),
        }));
    });

    public updateSelection(item: Tree): void {
        this.selectionService.updateSelection(item.value);
    }
}
