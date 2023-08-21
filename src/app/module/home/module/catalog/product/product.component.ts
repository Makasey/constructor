import { AbstractModuleComponent } from "@core/abstract/abstract.service";
import { AbstractProductService } from "./product.service";
import { ActivatedRoute } from "@angular/router";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
    selector: "app-product",
    templateUrl: "./product.component.html",
    styleUrls: ["./product.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent extends AbstractModuleComponent implements OnInit {
    public productId = this.activatedRoute.snapshot.params.productId;

    public product$ = this.service.selectProduct();

    constructor(
        protected service: AbstractProductService,
        private activatedRoute: ActivatedRoute,
    ) {
        super(service);
    }

    public ngOnInit(): void {
        super.ngOnInit({
            productId: this.productId,
        });
    }
}
