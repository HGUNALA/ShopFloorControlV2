import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopFloorControlComponent } from './shop-floor-control.component';

describe('ShopFloorControlComponent', () => {
  let component: ShopFloorControlComponent;
  let fixture: ComponentFixture<ShopFloorControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopFloorControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopFloorControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
