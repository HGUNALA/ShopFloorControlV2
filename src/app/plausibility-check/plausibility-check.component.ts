import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { WorkCenterService } from '../work-center.service';

@Component({
  selector: 'app-plausibility-check',
  templateUrl: './plausibility-check.component.html',
  styleUrls: ['./plausibility-check.component.css'],
})
export class PlausibilityCheckComponent implements OnInit {
  @Input() lang: string;
  datagridOptions: SohoDataGridOptions;
  sfColumns: SohoDataGridColumn[] = [];
  wcMsg: string;
  moNumber: string;
  reportNumber: string;
  selNumOfEmp: number;
  selEmpNumber: number;
  constructor(private _workCenterService: WorkCenterService) {}

  ngOnInit(): void {
    this.sfInitColumns();
    this.init();
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

  protected init() {
    this.datagridOptions = this.initDataGridOptions(
      'Plausibility Check',
      this.sfColumns
    );
  }
  sfInitColumns() {
    this.sfColumns = [
      {
        width: 150,
        id: 'col-WHLO-TX15',
        field: 'MFN1',
        name: 'Production order number',
        resizable: true,
      },
      {
        width: 150,
        id: 'col-WHLO-TX15',
        field: 'MFN1',
        name: 'Production order number',
        resizable: true,
      },
      {
        width: 150,
        id: 'col-DIVI',
        field: 'STDT',
        name: 'Start date',
        resizable: true,
        maxWidth: 2000,
        minWidth: 50,
      },
    ];
  }

  public initDataGridOptions(
    title: string,
    columns: SohoDataGridColumn[]
  ): SohoDataGridOptions {
    const options: SohoDataGridOptions = {
      isList: true,
      clickToSelect: true,
      editable: true,
      filterWhenTyping: true,
      rowNavigation: true,
      cellNavigation: false,

      enableTooltips: true,
      filterable: false,
      selectAllCurrentPage: true,
      stretchColumnOnChange: true,
      paging: true,
      pagesize: 10,
      indeterminate: false,
      rowHeight: 'large' as SohoDataGridRowHeight,
      selectable: 'single',
      showDirty: true,
      showFilterTotal: true,
      toolbar: {
        keywordFilter: true,
        collapsibleFilter: true,
        title: title,
        results: true,
        rowHeight: true,
        actions: true,
        personalize: true,
        filterRow: true,
      },
      columns: columns,
      dataset: [],
      emptyMessage: {
        title: 'No data is available',
        icon: 'icon-empty-no-data',
        color: 'azure',
      },
    };
    return options;
  }
  onProcess() {}
}
