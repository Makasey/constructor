import { ChangeDetectionStrategy, Component, HostBinding, OnInit, inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

import { guid } from "@datorama/akita";

import { LZToastrItemType, LZToastrService, MODAL_DATA_TOKEN, ModalWithData } from "@components/ui";

import { LZAbstractLoginService } from "./login.service";
import { LoginFormControl } from "./types";

@UntilDestroy()
@Component({
    selector: "lz-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LZLoginComponent implements ModalWithData<Record<string, unknown>>, OnInit {
    public data: Record<string, unknown>;

    public loginForm: FormGroup;

    public loginFormControl = LoginFormControl;

    @HostBinding("class.lz-login")
    public hostClass = true;

    private modalData = inject(MODAL_DATA_TOKEN);

    constructor(private toastrService: LZToastrService, private service: LZAbstractLoginService) {}

    public ngOnInit(): void {
        this.loginForm = new FormGroup({
            [LoginFormControl.EMAIL]: new FormControl("", [Validators.required, Validators.email]),
            [LoginFormControl.PASSWORD]: new FormControl("", [Validators.required]),
        });
    }

    public submitForm(): void {
        if (this.loginForm.invalid) {
            this.toastrService.addToastrItem({
                type: LZToastrItemType.ERROR,
                title: "Форма невалидна",
                id: guid(),
                text: "Пожалуйста, проверьте валидность формы",
            });

            return;
        }

        const { value } = this.loginForm;

        this.service
        .login(value.email as string, value.password as string)
        .pipe(untilDestroyed(this))
        .subscribe();
    }
}
