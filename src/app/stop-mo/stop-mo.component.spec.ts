import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopMoComponent } from './stop-mo.component';

describe('StopMoComponent', () => {
  let component: StopMoComponent;
  let fixture: ComponentFixture<StopMoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StopMoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StopMoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
