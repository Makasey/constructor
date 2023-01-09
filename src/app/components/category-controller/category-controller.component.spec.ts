import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryControllerComponent } from './category-controller.component';

describe('CategoryControllerComponent', () => {
  let component: CategoryControllerComponent;
  let fixture: ComponentFixture<CategoryControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
