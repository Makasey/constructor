import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BuyoutComponent } from "./buyout.component";

describe("BuyoutComponent", () => {
    let component: BuyoutComponent;
    let fixture: ComponentFixture<BuyoutComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ BuyoutComponent ],
        })
        .compileComponents();

        fixture = TestBed.createComponent(BuyoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
