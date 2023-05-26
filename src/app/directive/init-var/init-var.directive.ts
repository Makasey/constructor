import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from "@angular/core";
interface InitVarContext<T> {
    initVar: T | null;
}

@Directive({
    selector: "[initVar]",
    standalone: true,
})
export class LZInitVarDirective<T> implements OnInit {
    private _context: InitVarContext<T> = { initVar: null };

    constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<InitVarContext<T>>) {}

    @Input()
    public set initVar(value: T) {
        this._context.initVar = value;
    }

    public ngOnInit(): void {
        this.viewContainerRef.createEmbeddedView(this.templateRef, this._context);
    }
}
