import {
    AbstractDragService,
    AbstractEditorElementActionsService,
    EDITOR_SELECTED_PAGE,
    ElementButton,
    LZEditorElementComponent,
    SitePageElementType,
    SitePageElementUnion,
} from "@modules/constructor";
import { CdkDrag, CdkDragDrop, CdkDragPlaceholder, CdkDropList } from "@angular/cdk/drag-drop";
import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    Injector,
    OnInit,
    ViewEncapsulation,
    computed,
    effect,
    inject,
    input,
    runInInjectionContext,
    signal,
} from "@angular/core";
import { ElementResolverDirective } from "@shared-directives";
import { Subscription, tap } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
    selector: "lz-editor-element-flex",
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    providers: [],
    imports: [CdkDrag, CdkDragPlaceholder, CdkDropList, LZEditorElementComponent, ElementResolverDirective],
    host: {
        "[class.editor-element-flex]": "true",
    },
    templateUrl: "./editor-element-flex.component.html",
    styleUrl: "./editor-element-flex.component.scss",
})
export class LZEditorElementFlexComponent implements OnInit {
    public readonly elementID = input.required<string>();

    public readonly parentID = input.required<string>();

    public readonly selectedPage = inject(EDITOR_SELECTED_PAGE);

    private readonly editorElementsActions = inject(AbstractEditorElementActionsService);

    public element = signal<SitePageElementUnion | undefined>(undefined);

    public children = computed<SitePageElementUnion[]>(() => {
        const children = this.element()?.children;

        if (!children) {
            return [];
        }

        return children.map(child => this.editorElementsActions.getElement(child));
    });

    public readonly connectedLists = inject(AbstractDragService).getConnectedDropListsId();

    private subscription: Subscription | null;

    private readonly injector = inject(Injector);

    public ngOnInit(): void {
        effect(
            () => {
                const id = this.elementID();
                runInInjectionContext(this.injector, () => {
                    const destroyRef = inject(DestroyRef);

                    if (this.subscription) {
                        this.subscription.unsubscribe();
                        this.subscription = null;
                    }

                    this.subscription = this.editorElementsActions
                        .selectElement(id)
                        .pipe(
                            tap(element => this.element.set(element)),
                            takeUntilDestroyed(destroyRef),
                        )
                        .subscribe();
                });

                return () => this.subscription?.unsubscribe();
            },
            { injector: this.injector },
        );
    }

    public onDrop(event: CdkDragDrop<string, string | ElementButton[], string | ElementButton>): void {
        const { item, container, previousIndex, currentIndex, previousContainer } = event;
        const { data } = item;
        const { data: parentId } = container;
        const coercedParentId = parentId === "rootID" ? this.selectedPage() : parentId;

        if (container.data === previousContainer.data && previousIndex === currentIndex) {
            return;
        }

        if (previousContainer.data === container.data) {
            return this.editorElementsActions.changeElementPosition(previousIndex, currentIndex, coercedParentId);
        }

        if (typeof previousContainer.data === "string" && typeof data === "string") {
            return this.editorElementsActions.moveItemBetweenElements({
                previousIndex,
                currentIndex,
                elementId: data,
                oldParentId: previousContainer.data,
                parentId: coercedParentId,
            });
        }

        if (typeof data === "string") {
            return;
        }

        this.addElement(data.type, coercedParentId);
    }

    public addElement(type: SitePageElementType, parentId: string): void {
        this.editorElementsActions.addElementByType(type, parentId);
    }
}
