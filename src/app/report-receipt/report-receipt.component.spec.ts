import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportReceiptComponent } from './report-receipt.component';

describe('ReportReceiptComponent', () => {
  let component: ReportReceiptComponent;
  let fixture: ComponentFixture<ReportReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportReceiptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
