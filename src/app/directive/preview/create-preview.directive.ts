import { Directive, ElementRef, Input, OnChanges, OnDestroy, Renderer2, SimpleChanges, inject } from "@angular/core";

@Directive({
    selector: "[lzCreatePreview]",
    standalone: true,
})
export class CreatePreviewDirective implements OnChanges, OnDestroy {
    private readonly parser = new DOMParser();

    private readonly elementRef = inject(ElementRef);

    private iframe: HTMLIFrameElement | null = null;

    private readonly renderer2 = inject(Renderer2);

    @Input()
    public lzCreatePreview: string | undefined;

    public ngOnChanges(changes: SimpleChanges): void {
        this.removeIframe();

        if (changes.lzCreatePreview && this.lzCreatePreview) {
            const htmlDocument = this.parser.parseFromString(this.lzCreatePreview, "text/html");

            this.iframe = this.renderer2.createElement("iframe") as HTMLIFrameElement;

            this.renderer2.appendChild(this.elementRef.nativeElement, this.iframe);

            this.iframe.contentWindow?.document.write(htmlDocument.documentElement.outerHTML);
        }
    }

    public ngOnDestroy(): void {
        this.removeIframe();
    }

    private removeIframe(): void {
        if (this.iframe) {
            this.renderer2.removeChild(this.elementRef.nativeElement, this.iframe);
            this.iframe = null;
        }
    }
}
