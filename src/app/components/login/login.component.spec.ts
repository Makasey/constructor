import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LZLoginComponent } from "./login.component";

describe("LZLoginComponent", () => {
    let component: LZLoginComponent;
    let fixture: ComponentFixture<LZLoginComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LZLoginComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(LZLoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
