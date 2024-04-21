import { AbstractEditorElementActionsService, SectionPageElement, SitePageElement } from "@modules/constructor";
import { ChangeDetectionStrategy, Component, HostBinding, computed, inject } from "@angular/core";
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

    public rootElements = toSignal(this.service.selectPageElements(), { initialValue: [] as string[] });

    public items = toSignal(this.service.getItems());

    public elements = computed(() => {
        return this.rootElements().map(element => ({
            ...this.mapElementsToTreeModel(this.items()!, element),
        }));
    });

    public mapElementsToTreeModel(items: Record<string, SitePageElement>, element: string): Tree {
        if (!element || !items) {
            return {} as Tree;
        }

        const { id, children, type } = items[element];

        return {
            value: id,
            label: type,
            children: children.map(child => {
                return this.mapElementsToTreeModel(items, child);
            }),
        };
    }

    //todo for example

    // public itemss: Tree = {
    //     value: 1,
    //     children: [
    //         {
    //             value: 2,
    //             children: [
    //                 {
    //                     value: 4,
    //                     children: [],
    //                 },
    //                 {
    //                     value: 5,
    //                     children: [
    //                         {
    //                             value: 6,
    //                             children: [],
    //                         },
    //                         {
    //                             value: 7,
    //                             children: [
    //                                 {
    //                                     value: 3,
    //                                     children: [
    //                                         {
    //                                             value: 8,
    //                                             children: [],
    //                                         },
    //                                         {
    //                                             value: 9,
    //                                             children: [],
    //                                         },
    //                                     ],
    //                                 },
    //                             ],
    //                         },
    //                     ],
    //                 },
    //             ],
    //         },
    //     ],
    // };
}
