import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartMOComponent } from './start-mo.component';

describe('StartMOComponent', () => {
  let component: StartMOComponent;
  let fixture: ComponentFixture<StartMOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartMOComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartMOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
