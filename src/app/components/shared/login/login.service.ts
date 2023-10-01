import { Injectable } from "@angular/core";

import { Observable, catchError, of, tap } from "rxjs";

import { LZAbstractAuthDataService } from "@core";
import { LZToastrItemType, LZToastrService, ModalService } from "@components";
import { ServerError } from "@shared-types";

@Injectable()
export abstract class LZAbstractLoginService {
    public abstract login(email: string, password: string): Observable<unknown>;
}

@Injectable()
export class LZDefaultLoginService extends LZAbstractLoginService {
    constructor(
        private authDataService: LZAbstractAuthDataService,
        private toastrService: LZToastrService,
        private modalService: ModalService,
    ) {
        super();
    }

    public login(email: string, password: string): Observable<unknown> {
        return this.authDataService.login({ email: email, password: password }).pipe(
            tap(() => {
                this.toastrService.addToastrItem({
                    title: "Вы успешно вошли в аккаунт",
                    type: LZToastrItemType.SUCCESS,
                    text: "Теперь вы можете добавлять товары в корзину",
                });

                this.modalService.closeModal("my-login-modal");
            }),
            catchError((err: ServerError) => {
                this.toastrService.addToastrItem({
                    title: "Ошибка со статусом: " + err.error?.status,
                    type: LZToastrItemType.ERROR,
                    text: err.error?.message,
                });

                return of(err);
            }),
        );
    }
}
