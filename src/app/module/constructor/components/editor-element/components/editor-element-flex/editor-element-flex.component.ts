import { AbstractEditorElementActionsService, LZEditorElementComponent, SitePageElementUnion } from "@modules/constructor";
import { CdkDrag, CdkDropList } from "@angular/cdk/drag-drop";
import { ChangeDetectionStrategy, Component, Injector, OnInit, ViewEncapsulation, inject, input, signal } from "@angular/core";
import { ElementResolverDirective } from "@shared-directives";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
    selector: "lz-editor-element-flex",
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    providers: [],
    imports: [ElementResolverDirective, LZEditorElementComponent, CdkDropList, CdkDrag],
    host: {
        "[class.editor-element-flex]": "true",
    },
    hostDirectives: [CdkDrag],
    templateUrl: "./editor-element-flex.component.html",
    styleUrl: "./editor-element-flex.component.scss",
})
export class LZEditorElementFlexComponent implements OnInit {
    public readonly elementID = input.required<string>();

    public readonly parentID = input.required<string>();

    private readonly editorElementsActions = inject(AbstractEditorElementActionsService);

    public element = signal<SitePageElementUnion | undefined>(undefined).asReadonly();

    private readonly injector = inject(Injector);

    public ngOnInit(): void {
        this.element = toSignal(this.editorElementsActions.selectElement(this.elementID()), { injector: this.injector });
    }
}
