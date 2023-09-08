import { File, PaginationListItems } from "@shared-types/index";
import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, delay, map } from "rxjs";
import { mapPaginationResponseToListModel } from "@shared-utils/utils";

@Injectable()
export abstract class AbstractFilesDataService {
    public abstract getFileList(): Observable<PaginationListItems<File>>;

    public abstract getFileById(id: number): Observable<File>;

    public abstract removeFile(id: number): Observable<void>;

    public abstract uploadFiles(fileList: FormData): Observable<File[]>;
}

@Injectable()
export class DefaultFilesDataService extends AbstractFilesDataService {
    private readonly httpClient = inject(HttpClient);

    public getFileList(): Observable<PaginationListItems<File>> {
        return this.httpClient
            .get<File[]>("http://localhost:7000/api/editor-files", { observe: "response" })
            .pipe(map(response => mapPaginationResponseToListModel(response)));
    }

    public getFileById(id: number): Observable<File> {
        return this.httpClient.get<File>(`http://localhost:7000/api/editor-files/${id}`);
    }

    public uploadFiles(fileList: FormData): Observable<File[]> {
        return this.httpClient.post<File[]>(`http://localhost:7000/api/editor-files`, fileList).pipe(delay(5000));
    }

    public removeFile(id: number): Observable<void> {
        return this.httpClient.delete<void>(`http://localhost:7000/api/editor-files/${id}`);
    }
}
