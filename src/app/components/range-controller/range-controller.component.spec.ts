import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeControllerComponent } from './range-controller.component';

describe('RangeControllerComponent', () => {
  let component: RangeControllerComponent;
  let fixture: ComponentFixture<RangeControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RangeControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RangeControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
