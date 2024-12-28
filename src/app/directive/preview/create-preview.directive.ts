import { Directive, ElementRef, OnChanges, OnDestroy, Renderer2, SimpleChanges, inject, input } from "@angular/core";

@Directive({
    selector: "[lzCreatePreview]",
    standalone: true,
})
export class CreatePreviewDirective implements OnChanges, OnDestroy {
    private readonly parser = new DOMParser();

    private readonly elementRef = inject(ElementRef);

    private iframe: HTMLIFrameElement | null = null;

    private readonly renderer2 = inject(Renderer2);

    public readonly lzCreatePreview = input<string>();

    public ngOnChanges(changes: SimpleChanges): void {
        this.removeIframe();

        const lzCreatePreview = this.lzCreatePreview();
        if (changes.lzCreatePreview && lzCreatePreview) {
            const htmlDocument = this.parser.parseFromString(lzCreatePreview, "text/html");

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
