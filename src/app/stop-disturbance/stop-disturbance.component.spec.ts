import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopDisturbanceComponent } from './stop-disturbance.component';

describe('StopDisturbanceComponent', () => {
  let component: StopDisturbanceComponent;
  let fixture: ComponentFixture<StopDisturbanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StopDisturbanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StopDisturbanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
