import { ChangeDetectionStrategy, Component, HostBinding, TemplateRef, ViewEncapsulation, inject, viewChild } from "@angular/core";

import { Subject } from "rxjs";

import { HostModalContentDirective, ModalConfig, ModalService } from "@components";

@Component({
    selector: "ap-modal",
    templateUrl: "./modal.component.html",
    styleUrls: ["./modal.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [HostModalContentDirective],
})
export class ModalComponent {
    public config: ModalConfig;

    public closeSubject$: Subject<unknown> = new Subject<unknown>();

    private readonly modalService = inject(ModalService);

    public readonly hostView = viewChild.required(HostModalContentDirective);

    public readonly defaultContent = viewChild.required<TemplateRef<unknown>>("defaultContent");

    @HostBinding("class")
    public get hostClass(): string {
        return this.config.customClass ?? "";
    }

    public text: string;

    public closeModal(): void {
        if (!this.config.closeOnOutsideClick) {
            return;
        }

        this.closeSubject$.next(undefined);
        this.closeSubject$.complete();

        this.modalService.closeModal(this.config.id, undefined);
    }

    public stopEventPropagation(event: Event): void {
        event.stopPropagation();
    }
}
