import { Injectable } from '@angular/core';
import { IMIRequest, IMIResponse, MIRecord } from '@infor-up/m3-odin';
import { MIService } from '@infor-up/m3-odin-angular';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkCenterService {
  output: string[];
  wcFinal: any;
  test1: IMIResponse;
  private _chWCenter = new BehaviorSubject<string>('');
  private _chmoNmber = new BehaviorSubject<string>('');
  private _chReportNmber = new BehaviorSubject<string>('');
  private _chFromDate = new BehaviorSubject<string>('');
  private _chToDate = new BehaviorSubject<string>('');
  private _chfacDesc = new BehaviorSubject<string>('');
  private _chDataGrid = new BehaviorSubject<Object[]>([]);
  chWorkCenter$ = this._chWCenter.asObservable();
  chMoNumber$ = this._chmoNmber.asObservable();
  chdtaGrd$ = this._chDataGrid.asObservable();
  chReportNumber$ = this._chReportNmber.asObservable();
  chFromDate$ = this._chFromDate.asObservable();
  chToDate$ = this._chToDate.asObservable();
  chFacDesc$ = this._chfacDesc.asObservable();
  constructor(private _miService: MIService) {}

  sendChDetails(wcMessage: string, moNumber: string, reportNumber: string) {
    console.log(wcMessage);
    console.log(moNumber);

    this._chWCenter.next(wcMessage);
    this._chmoNmber.next(moNumber);
    this._chReportNmber.next(reportNumber);
  }

  storeMainScreenDetails(
    dataGrid: object[],
    fromDate: string,
    toDate: string,
    facDesc: string
  ) {
    console.log(dataGrid);
    this._chDataGrid.next(dataGrid);
    this._chFromDate.next(fromDate);
    this._chToDate.next(toDate);
    this._chfacDesc.next(facDesc);
  }

  //   getLstFD_ASF_WRKCN() {
  //     let record: MIRecord = new MIRecord();
  //     record['F1FILE'] = 'MPDWCT';
  //     this.output = ['F1PK02', 'PPOPDS', 'F1PK01'];
  //     const request: IMIRequest = {
  //       includeMetadata: true,
  //       program: 'CMS100MI',
  //       transaction: 'LstFD_ASF_WRKCN',
  //       outputFields: this.output,
  //       record: record,
  //       maxReturnedRecords: 0,
  //     };
  //     console.log(request);

  //     this._miService.execute(request).subscribe((response: IMIResponse) => {
  //       console.log(response);
  //       this.test1 = response;
  //       if (!response.hasError()) {
  //         this.filterWCData(response.items);
  //       }
  //     });
  //   }
  //   filterWCData(_response: any) {
  //     const result = _response.filter((obj: any) => {
  //       return obj.F1PK01 === 'B01';
  //     });
  //     console.log(result);
  //     this.wcFinal = result;
  //   }
}
