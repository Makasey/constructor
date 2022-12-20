import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {Observable, tap} from "rxjs";
import {Product} from "../../types";
import {TestService} from "./store";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

export type ItemsWithId<T> = {
  items: T[];
  id: number;
}

@UntilDestroy()
@Component({
    selector: "app-test",
    templateUrl: "./test.component.html",
    styleUrls: ["./test.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestComponent implements OnInit {
    public products$: Observable<Product[]> = this.service.selectProducts().pipe(tap(console.log));

    constructor(private service: TestService) {}

    public ngOnInit(): void {
        this.service.fetchProducts().pipe(untilDestroyed(this)).subscribe();
    }

    public updateProductList(): void {
        this.service.test();
    }
}
