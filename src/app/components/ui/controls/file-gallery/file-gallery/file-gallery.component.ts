import { AbstractFileGalleryService } from "./file-gallery.service";
import { AbstractModuleComponent } from "@core/abstract/abstract.service";
import { AsyncPipe, NgForOf, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, ViewChild, ViewEncapsulation, inject } from "@angular/core";
import { FILE_UPLOAD_PROVIDERS } from "@components/ui/controls/file-gallery/types";
import { File } from "@shared-types/index";
import { MODAL_DATA_TOKEN, MODAL_ID_TOKEN, ModalService, ModalWithData } from "@components/ui";
import { tap } from "rxjs";
import { untilDestroyed } from "@ngneat/until-destroy";

@Component({
    selector: "lz-file-gallery",
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./file-gallery.component.scss"],
    templateUrl: "./file-gallery.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    providers: [...FILE_UPLOAD_PROVIDERS],
    imports: [AsyncPipe, NgForOf, NgIf],
})
export class FileGalleryComponent extends AbstractModuleComponent implements ModalWithData<File | undefined> {
    @HostBinding("class.lz-file-gallery")
    public hostClass = true;

    @ViewChild("fileUpload", { static: true })
    private fileUpload: ElementRef<HTMLInputElement>;

    public data: File | undefined;

    private readonly modalResult = inject(ModalService);

    private readonly modalData = inject(MODAL_DATA_TOKEN) as File;

    private readonly modalId = inject(MODAL_ID_TOKEN);

    public files$ = this.service.selectEntities();

    public selectedElement: File | null = this.modalData;

    constructor(protected service: AbstractFileGalleryService) {
        super(service);
    }

    public selectElement(file: File): void {
        if (this.selectedElement?.id === file.id) {
            this.selectedElement = null;
        } else {
            this.selectedElement = file;
        }
    }

    public onFilesUpload(): void {
        const value = this.fileUpload.nativeElement.files as FileList;

        this.service
            .createEntity(value)
            .pipe(
                tap(() => {
                    this.fileUpload.nativeElement.value = "";
                }),
                untilDestroyed(this),
            )
            .subscribe();
    }

    public removeFile(id: number): void {
        this.service.deleteEntity(id).pipe(untilDestroyed(this)).subscribe();
    }

    public apply(): void {
        this.modalResult.closeModal(this.modalId, this.selectedElement);
    }

    public reject(): void {
        this.modalResult.closeModal(this.modalId, null);
    }
}
