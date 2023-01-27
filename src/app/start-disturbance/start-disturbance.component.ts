import { Component, Input, OnInit } from '@angular/core';
import { WorkCenterService } from '../work-center.service';

@Component({
  selector: 'app-start-disturbance',
  templateUrl: './start-disturbance.component.html',
  styleUrls: ['./start-disturbance.component.css'],
})
export class StartDisturbanceComponent implements OnInit {
  @Input() lang: string;
  wcMsg: string;
  moNumber: string;
  reportNumber: string;
  selNumOfEmp: number;
  selEmpNumber: number;
  constructor(private _workCenterService: WorkCenterService) {}

  ngOnInit(): void {
    console.log('check');
    console.log(this.lang);

    this._workCenterService.chWorkCenter$.subscribe((wcMessage) => {
      console.log(wcMessage);
      this.wcMsg = wcMessage;

      console.log('check1');
    });
    this._workCenterService.chMoNumber$.subscribe((message: string) => {
      console.log(message);
      this.moNumber = message;
      console.log('check1');
    });
    this._workCenterService.chReportNumber$.subscribe((message: string) => {
      console.log(message);
      this.reportNumber = message;
      console.log('check1');
    });
    console.log('check2');
    console.log(this.moNumber);
  }

  onProcess() {}
}
