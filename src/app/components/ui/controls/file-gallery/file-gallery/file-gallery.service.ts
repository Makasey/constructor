import { AbstractDefaultModuleService, AbstractFilesDataService, AbstractModuleService, LzQuery, LzService, LzStateKey, UIDataState } from "@core";
import { File } from "@shared-types/file/file";
import { Injectable } from "@angular/core";
import { LZToastrItemType, LZToastrService } from "@components";
import { Observable, catchError, tap, throwError } from "rxjs";
import { ResponseError } from "@shared-types/response/response-view.type";

@Injectable()
export abstract class AbstractFileGalleryService extends AbstractModuleService {
    public abstract createEntity(data: FileList): Observable<File[]>;

    public abstract deleteEntity(id: number): Observable<void>;

    public abstract selectEntities(): Observable<File[]>;
}

@Injectable()
export class FileGalleryService extends AbstractDefaultModuleService<LzStateKey.FILES_STATE> implements AbstractFileGalleryService {
    constructor(
        protected query: LzQuery,
        protected service: LzService,
        private readonly dataService: AbstractFilesDataService,
        private toastrService: LZToastrService,
    ) {
        super(LzStateKey.FILES_STATE, query, service);
    }

    public asyncInit(): Observable<unknown> {
        return this.dataService.getFileList().pipe(
            tap(({ items }) => {
                this.service.updateStatePart(this.stateKey, () => {
                    return {
                        files: items,
                        dataState: UIDataState.LOADED,
                    };
                });
            }),
        );
    }

    public createEntity(data: FileList): Observable<File[]> {
        const processedData = this.convertFileListToFormData(data);
        this.updateDataState(UIDataState.LOADING);

        return this.dataService.uploadFiles(processedData).pipe(
            tap(files => {
                this.toastrService.addToastrItem({
                    type: LZToastrItemType.SUCCESS,
                    text: `Файл успешно создан`,
                    title: "Успех",
                });

                this.service.updateStatePart(this.stateKey, state => {
                    return {
                        files: state.files.concat(files),
                        dataState: UIDataState.LOADED,
                    };
                });
            }),
            catchError((err: ResponseError) => {
                this.toastrService.addToastrItem({
                    type: LZToastrItemType.ERROR,
                    text: (err.error.messages ?? []).join(", "),
                    title: "Что-то пошло не так",
                });

                return throwError(err);
            }),
        );
    }

    private convertFileListToFormData(list: FileList): FormData {
        const formData = new FormData();

        for (let i = 0; i < list.length; i++) {
            formData.append("files", list[i]);
        }

        return formData;
    }

    public deleteEntity(id: number): Observable<void> {
        this.updateDataState(UIDataState.LOADING);

        return this.dataService.removeFile(id).pipe(
            tap(() => {
                this.toastrService.addToastrItem({
                    type: LZToastrItemType.SUCCESS,
                    text: `Файл с id: ${id} успешно удалён`,
                    title: "Успех",
                });

                this.service.updateStatePart(this.stateKey, state => {
                    const { files } = state;

                    return {
                        files: files.filter(file => file.id !== id),
                        dataState: UIDataState.LOADED,
                    };
                });
            }),
            catchError((err: ResponseError) => {
                this.toastrService.addToastrItem({
                    type: LZToastrItemType.ERROR,
                    text: (err.error.messages ?? []).join(", "),
                    title: "Что-то пошло не так",
                });

                return throwError(err);
            }),
        );
    }

    public selectEntities(): Observable<File[]> {
        return this.selectState(state => state.files);
    }
}
