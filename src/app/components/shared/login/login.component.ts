import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";

import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

import { guid } from "@datorama/akita";

import { LZToastrItemType, LZToastrService, ModalWithData } from "@components";

import { LZAbstractLoginService } from "./login.service";
import { LoginFormControl } from "./types";

@UntilDestroy()
@Component({
    selector: "lz-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ReactiveFormsModule]
})
export class LZLoginComponent implements ModalWithData<Record<string, unknown>>, OnInit {
    public data: Record<string, unknown>;

    public loginForm: FormGroup;

    public loginFormControl = LoginFormControl;

    @HostBinding("class.lz-login")
    public hostClass = true;

    constructor(
        private toastrService: LZToastrService,
        private service: LZAbstractLoginService,
    ) {}

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

        const { email, password } = this.loginForm.value as { email: string; password: string };

        this.service.login(email, password).pipe(untilDestroyed(this)).subscribe();
    }
}
