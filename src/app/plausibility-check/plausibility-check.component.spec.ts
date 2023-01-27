import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlausibilityCheckComponent } from './plausibility-check.component';

describe('PlausibilityCheckComponent', () => {
  let component: PlausibilityCheckComponent;
  let fixture: ComponentFixture<PlausibilityCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlausibilityCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlausibilityCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
