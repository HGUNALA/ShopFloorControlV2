import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartDisturbanceComponent } from './start-disturbance.component';

describe('StartDisturbanceComponent', () => {
  let component: StartDisturbanceComponent;
  let fixture: ComponentFixture<StartDisturbanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartDisturbanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartDisturbanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
