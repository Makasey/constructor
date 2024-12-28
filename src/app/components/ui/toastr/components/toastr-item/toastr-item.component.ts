import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    HostListener,
    Injector,
    Input,
    NgZone,
    OnInit,
    TemplateRef,
    ViewContainerRef,
    inject,
    input,
    output,
    viewChild,
} from "@angular/core";
import { CommonModule } from "@angular/common";

import { fadeInAnimation, fadeOutAnimation } from "@core";

import { DISAPPEARING_TIME_TOKEN, EXISTING_TIME_TOKEN, LZToastrItem, TOASTR_ITEM_OPTIONS_TOKEN } from "@components";

@Component({
    selector: "lz-toastr-item",
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "./toastr-item.component.html",
    animations: [fadeInAnimation, fadeOutAnimation],
    imports: [CommonModule],
})
export class LZToastrItemComponent implements OnInit {
    public readonly item = input.required<LZToastrItem>();

    @Input()
    public set alwaysOnDisplay(value: boolean) {
        this._alwaysOnDisplay = value;

        if (value) {
            this.preventAnimation();
        }
    }

    public readonly onTimeExpired = output();

    public readonly onClose = output();

    public readonly embeddedContainer = viewChild.required("embedded", { read: ViewContainerRef });

    @HostBinding("@fadeIn")
    public fadeInAnimation = true;

    @HostBinding("@fadeOut")
    public itemState = "open";

    @HostBinding("class.lz-toastr-item")
    public hostClass = true;

    public get itemClass(): string {
        const item = this.item();
        return item.customColor ? "" : `_${item.type}`;
    }

    private _alwaysOnDisplay: boolean;

    private readonly EXISTING_TIME: number = inject(EXISTING_TIME_TOKEN);

    private readonly DISAPPEARING_TIME: number = inject(DISAPPEARING_TIME_TOKEN);

    private startExistingTime: number;

    private remainExistingTime: number = this.EXISTING_TIME;

    private existingTimerId: number;

    private disappearingTimerId: number;

    constructor(
        private cdr: ChangeDetectorRef,
        private ngZone: NgZone,
    ) {}

    public ngOnInit(): void {
        if (!this._alwaysOnDisplay) {
            this.startExisting();
        }

        const itemTemplate = this.item().template;

        if (itemTemplate) {
            if (itemTemplate instanceof TemplateRef) {
                this.embeddedContainer().createEmbeddedView(itemTemplate, { context: this.item().context });
            } else {
                const injector = Injector.create({
                    providers: [
                        {
                            provide: TOASTR_ITEM_OPTIONS_TOKEN,
                            useValue: itemTemplate.options,
                        },
                    ],
                });
                this.embeddedContainer().createComponent(itemTemplate.component, { index: 0, injector: injector });
            }
        }
    }

    @HostListener("mouseover")
    public onMouseOver(): void {
        if (!this._alwaysOnDisplay) {
            this.preventAnimation();
        }
    }

    @HostListener("mouseout")
    public onMouseOut(): void {
        if (!this._alwaysOnDisplay) {
            this.resumeAnimation();
        }
    }

    public _onCloseClick(): void {
        this.itemState = "hidden";
        this.onClose.emit();
    }

    private pauseExisting(): void {
        clearTimeout(this.existingTimerId);

        this.remainExistingTime -= Date.now() - this.startExistingTime;
    }

    private startExisting(): void {
        this.startExistingTime = Date.now();
        clearTimeout(this.existingTimerId);

        this.ngZone.runOutsideAngular(() => {
            this.existingTimerId = window.setTimeout(() => {
                this.startDisappearing();
            }, this.remainExistingTime);
        });
    }

    private startDisappearing(): void {
        this.itemState = "hidden";

        this.cdr.detectChanges();

        clearTimeout(this.disappearingTimerId);

        this.ngZone.runOutsideAngular(() => {
            this.disappearingTimerId = window.setTimeout(() => {
                this.onTimeExpired.emit();
            }, this.DISAPPEARING_TIME);
        });
    }

    private preventAnimation(): void {
        if (this.existingTimerId) {
            this.pauseExisting();
        }

        if (this.disappearingTimerId) {
            this.itemState = "open";
            clearTimeout(this.disappearingTimerId);
        }
    }

    private resumeAnimation(): void {
        if (this.existingTimerId) {
            this.startExisting();
        }
        if (this.disappearingTimerId) {
            this.startDisappearing();
        }
    }
}
