import { AbstractCatalogFiltersService } from "./catalog-filters.service";
import { AbstractModuleComponent } from "@core/abstract/abstract.service";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { LZToastrItemType } from "@components/ui";
import { LZToastrService } from "@components/ui";
import { NgFormsManager } from "@ngneat/forms-manager";
import { guid } from "@datorama/akita";

@Component({
    selector: "lz-catalog-filters",
    templateUrl: "./catalog-filters.component.html",
    styleUrls: ["./catalog-filters.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogFiltersComponent extends AbstractModuleComponent<{ productId: string; }> implements OnInit {
    public _formModel$ = this.service.selectFilters();

    constructor(protected service: AbstractCatalogFiltersService, private formsManager: NgFormsManager, private toastrService: LZToastrService) {
        super(service);
    }

    public ngOnInit(): void {
        super.ngOnInit({ productId: "12345" });
        this.formsManager.valueChanges("filtersFormModel").subscribe(console.log);
    }

    public addNotification(): void {
        this.toastrService.addToastrItem({
            id: guid(),
            title: "The best notification",
            text: "Text bla bla bla...",
            type: LZToastrItemType.SUCCESS,
        });

        this.service.applyFilters();
    }
}
