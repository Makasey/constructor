import { Injectable, inject } from "@angular/core";
import { LZToastrItemType, LZToastrService } from "@components";
import { guid } from "@datorama/akita";

@Injectable({
    providedIn: "root",
})
export class LocalStorageService {
    private toastrService = inject(LZToastrService);

    public setItem(key: string, value: string): void {
        try {
            localStorage.setItem(key, value);
        } catch (error: unknown) {
            this.toastrService.addToastrItem({
                type: LZToastrItemType.ERROR,
                title: "Элементы не сохранились",
                id: guid(),
                text: (error as Error)?.message ?? "Пожалуйста, попробуйте снова",
            });
        }
    }

    public getItem(key: string): string | null {
        return localStorage.getItem(key);
    }

    public removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    public clear(): void {
        localStorage.clear();
    }
}
