import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostBinding, HostListener, Injector, Input, NgZone, OnInit, Output, TemplateRef, ViewChild, ViewContainerRef } from "@angular/core";
import { LZToastrItem } from "../../types";
import { fadeInAnimation, fadeOutAnimation } from "../../../../../core/animations/animations";

@Component({
    selector: "lz-toastr-item",
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "./toastr-item.component.html",
    animations: [fadeInAnimation, fadeOutAnimation],
})
export class LZToastrItemComponent implements OnInit {
    @Input()
    public item: LZToastrItem;

    @Input()
    public set alwaysOnDisplay(value: boolean) {
        this._alwaysOnDisplay = value;

        if (value) {
            this.preventAnimation();
        }
    }

    @Output()
    public onTimeExpired: EventEmitter<void> = new EventEmitter();

    @Output()
    public onClose: EventEmitter<void> = new EventEmitter();

    @ViewChild("embedded", {
        read: ViewContainerRef,
        static: true,
    })
    public embeddedContainer: ViewContainerRef;

    @HostBinding("@fadeIn")
    public fadeInAnimation: boolean = true;

    @HostBinding("@fadeOut")
    public itemState: string = "open";

    @HostBinding("class.lz-toastr-item")
    public hostClass: boolean = true;

    public get itemClass(): string {
        return this.item.customColor ? "" : `_${this.item.type}`;
    }

    private _alwaysOnDisplay: boolean;

    //TODO: @AlexProffe Add injection token for this
    private readonly EXISTING_TIME: number = 8000;

    private readonly DISAPPEARING_TIME: number = 5000;

    private startExistingTime: number;

    private remainExistingTime: number = this.EXISTING_TIME;

    private existingTimerId: number;

    private disappearingTimerId: number;

    constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

    public ngOnInit(): void {
        if (!this._alwaysOnDisplay) {
            this.startExisting();
        }

        const itemTemplate = this.item.template;

        if (itemTemplate) {
            if (itemTemplate instanceof TemplateRef) {
                this.embeddedContainer.createEmbeddedView(itemTemplate, { context: this.item.context });
            } else {
                const injector = Injector.create([
                    {
                        provide: "options",
                        useValue: itemTemplate.options,
                    },
                ]);
                this.embeddedContainer.createComponent(itemTemplate.component, { index: 0, injector: injector });
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

        this.cdr.markForCheck();

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
