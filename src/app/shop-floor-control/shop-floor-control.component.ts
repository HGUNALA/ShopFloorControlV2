import { Component, OnInit } from '@angular/core';
import {
  IMIRequest,
  IMIResponse,
  IUserContext,
  MIRecord,
} from '@infor-up/m3-odin';
import { FormService, MIService, UserService } from '@infor-up/m3-odin-angular';
import { WorkCenterService } from '../work-center.service';

@Component({
  selector: 'app-shop-floor-control',
  templateUrl: './shop-floor-control.component.html',
  styleUrls: ['./shop-floor-control.component.css'],
})
export class ShopFloorControlComponent implements OnInit {
  toolbar: SohoToolbarOptions;
  wcToolbar: SohoToolbarOptions;
  wcColumns: SohoDataGridColumn[] = [];
  sfColumns: SohoDataGridColumn[] = [];
  faciFinal: Object[] = [];
  wcFinal: Object[] = [];
  settings: string[] = [
    'TIME_REPORTING',
    //  'PLAUSIBILITY_CHECK',
    //  'IN_PROCESS_CONTROL',
    //  'TANK_EMPTY_ALLOWED',
    //  'PRINT_ENABLED',
    //  'PRINT_LABEL_BMIN',
    //  'PRE_FILL_QUANTITY',
    //  'WARN_SETTING_PALLET_ZERO',
    //  'USE_RETURNLOC_AT_RECEIVE',
    //  'CAN_OVERRIDE_RETURNLOC_AT_RCV',
    'FILTER_FROM_DATE',
    'FILTER_TO_DATE',
    //  'LIQUID_TANK_GROUP',
    //  'LOCK_ISSUE_PERCENTAGE',
    //  'LOCK_RECEIPT_PERCENTAGE',
    //  'EXPIRATION_DATE_ENABLED',
  ];
  shwFaciDesc: string = '';
  selTR: number = 0;
  selPC: number = 0;
  selIPC: number = 0;
  selTEA: number = 0;
  selPE: number = 0;
  selPFQ: number = 0;
  selWSP: number = 0;
  selURA: number = 0;
  selCOR: number = 0;
  selGrt: number = 0;
  selFFD: number = 0;
  selFTD: number = 0;
  selLTG: string = '';
  selAMP: number = 0;
  selLIP: number = 0;
  selLRP: number = 0;
  selEDE: number = 0;
  selPLB: string = '';
  shwWCDesc: string = '';
  columns: SohoDataGridColumn[] = [];
  isLoading: boolean = true;
  isLoadingText: string = 'Fetching the default user information';
  datagridOptions: SohoDataGridOptions;
  userData: IUserContext;
  output: string[];
  faciRaw: any;
  lstDivi: any[];
  selToDate: string = '';
  selFromDate: string = '';
  isWCSelect: boolean;
  isReportRcptDisable: boolean = true;
  isFTDateApply: boolean = true;
  defaultDivi: any;
  meterFlag: boolean;
  shwdivi: any;
  settingIndex: number = 0;
  isstartMODisable: boolean = true;
  result: string = ' results';

  constructor(
    private _userService: UserService,
    private _miService: MIService,
    private _formService: FormService,
    private _workCenterService: WorkCenterService
  ) {}

  ngOnInit(): void {
    console.log(this.wcFinal);
    this._workCenterService.chWorkCenter$.subscribe((message) => {
      console.log(message);
      this.shwWCDesc = message;
      console.log('check1');
    });
    this._workCenterService.chFromDate$.subscribe((message) => {
      console.log(message);
      this.selFromDate = message;
      console.log('check1');
    });
    this._workCenterService.chToDate$.subscribe((message) => {
      console.log(message);
      this.selToDate = message;
      console.log('check1');
    });
    this._workCenterService.chFacDesc$.subscribe((message) => {
      console.log(message);
      this.shwFaciDesc = message;
      console.log('check1');
    });
    this._userService.getUserContext().subscribe((response) => {
      this.userData = response;
      console.log(this.userData);
      console.log(this.selFromDate);

      if (
        !(
          this.selFromDate.length > 1 &&
          this.selToDate.length > 1 &&
          this.shwFaciDesc.length > 1
        )
      ) {
        this.getBasicData();
        this.getLstCmpDivi();
        this.getLstFD_ASF_WRKCN();
      } else {
        this.isLoading = false;
      }
      // this.whInitColumns();
      // this.DgOptions = { ...this.DgOptions };
    });
    //  console.log(this.datagridOptions.dataset);

    this.whInitColumns();
    this.wcInitColumns();
    this.diviToolbar();
    this.onWCToolbar();
    this.sfInitColumns();
    this.init();
    if (this.datagridOptions.dataset.length < 1) {
      this.isLoading = true;
      this.getSelect();
    }
    //  this._workCenterService.chdtaGrd$.subscribe((message) => {
    //    console.log(message);
    //    console.log(this.datagridOptions.dataset);
    //    this.datagridOptions = { ...this.datagridOptions };
    //    this.datagridOptions.dataset = message;

    //    console.log('check1');
    //  });
  }
  getFieldValue(setting: string) {
    let record: MIRecord = new MIRecord();
    this.isLoadingText = 'Fetching the Settings values';
    record['FILE'] = 'ASF001';
    record['PK01'] = this.userData.currentCompany;
    record['PK02'] = this.shwdivi;
    record['PK08'] = setting;
    let output: string[] = ['N196', 'A121', 'N096'];
    const request: IMIRequest = {
      includeMetadata: true,
      program: 'CUSEXTMI',
      transaction: 'GetFieldValue',
      record: record,
      outputFields: output,
      maxReturnedRecords: 0,
    };
    console.log(request);

    this._miService.execute(request).subscribe(
      (response: IMIResponse) => {
        console.log(response);

        this.allocateSetting(request.record['PK08'], response);
        console.log(this.selFFD);

        if (this.settingIndex < this.settings.length - 1) {
          this.getFieldValue(this.settings[++this.settingIndex]);
        } else {
          this.settingIndex = 0;
          console.log('else');

          this.isLoading = false;
        }
      },
      (error: IMIResponse) => {
        console.log('error');

        this.isLoading = false;
      }
    );
  }
  allocateSetting(_request: string, _response?: IMIResponse) {
    switch (_request) {
      case 'TIME_REPORTING': {
        this.selTR = +_response.item['N196'];
        break;
      }
      case 'PLAUSIBILITY_CHECK': {
        this.selPC = +_response.item['N196'];
        break;
      }
      case 'IN_PROCESS_CONTROL': {
        this.selIPC = +_response.item['N196'];
        break;
      }
      case 'TANK_EMPTY_ALLOWED': {
        this.selTEA = +_response.item['N196'];
        break;
      }
      case 'PRINT_ENABLED': {
        this.selPE = +_response.item['N196'];
        break;
      }
      case 'PRINT_LABEL_BMIN': {
        this.selPLB = _response.item['A121'];
        break;
      }
      case 'PRE_FILL_QUANTITY': {
        this.selPFQ = +_response.item['N196'];
        break;
      }
      case 'WARN_SETTING_PALLET_ZERO': {
        this.selWSP = +_response.item['N196'];
        break;
      }
      case 'USE_RETURNLOC_AT_RECEIVE': {
        this.selURA = +_response.item['N196'];
        break;
      }
      case 'CAN_OVERRIDE_RETURNLOC_AT_RCV': {
        this.selCOR = +_response.item['N196'];
        break;
      }
      case 'FILTER_FROM_DATE': {
        this.selFFD = +_response.item['N096'];
        break;
      }
      case 'FILTER_TO_DATE': {
        this.selFTD = +_response.item['N096'];
        this.settingsFromToDate();
        break;
      }
      case 'LIQUID_TANK_GROUP': {
        this.selLTG = _response.item['A121'];
        break;
      }
      case 'LOCK_ISSUE_PERCENTAGE': {
        this.selLIP = +_response.item['N196'];
        break;
      }
      case 'LOCK_RECEIPT_PERCENTAGE': {
        this.selLRP = +_response.item['N196'];
        break;
      }
      case 'EXPIRATION_DATE_ENABLED': {
        this.selEDE = +_response.item['N196'];
        break;
      }
    }
  }

  //   onStartMo() {
  //     console.log(this.selTR);

  //   }

  settingsFromToDate() {
    let todayFromDate: Date = new Date(),
      todayToDate: Date = new Date();
    if (this.selFFD > 0 && this.selFTD > 0) {
      todayFromDate.setDate(todayFromDate.getDate() - this.selFFD);
      todayToDate.setDate(todayToDate.getDate() + this.selFTD);
    }
    let fYear: number,
      fMonth: number,
      fDate: number,
      tYear: number,
      tMonth: number,
      tDate: number;
    fYear = todayFromDate.getFullYear();
    fMonth = todayFromDate.getMonth() + 1;
    fDate = todayFromDate.getDate();
    tYear = todayToDate.getFullYear();
    tMonth = todayToDate.getMonth() + 1;
    tDate = todayToDate.getDate();
    this.selFromDate =
      fYear +
      '-' +
      (fMonth.toString().length === 2 ? fMonth : '0' + fMonth) +
      '-' +
      (fDate.toString().length === 2 ? fDate : '0' + fDate);
    this.selToDate =
      tYear +
      '-' +
      (tMonth.toString().length === 2 ? tMonth : '0' + tMonth) +
      '-' +
      (tDate.toString().length === 2 ? tDate : '0' + tDate);
  }
  //   onchMessage() {
  //     console.log(this.shwWCDesc);

  //     this.meterFlag = true;
  //     console.log('coming');
  //   }
  getLstFD_ASF_WRKCN() {
    let record: MIRecord = new MIRecord();
    record['F1FILE'] = 'MPDWCT';
    this.output = ['F1PK02', 'PPOPDS', 'F1PK01'];
    const request: IMIRequest = {
      includeMetadata: true,
      program: 'CMS100MI',
      transaction: 'LstFD_ASF_WRKCN',
      outputFields: this.output,
      record: record,
      maxReturnedRecords: 0,
    };
    console.log(request);

    this._miService.execute(request).subscribe((response: IMIResponse) => {
      console.log(response);
      if (!response.hasError()) {
        //   this.wcFinal = response.items;
        this.filterWCData(response.items);
        console.log(this.wcFinal);
        //this.shwWCDesc = response.item.F1PK02 + ' - ' + response.item.PPOPDS;
        console.log(this.shwWCDesc);
      }
    });
  }
  onApplyDates() {
    this.isLoading = true;
    this.datagridOptions.dataset = [];
    console.log(this.selFromDate);
    console.log(this.isReportRcptDisable);
    this.isLoading = true;
    this.getSelect();
  }
  filterWCData(_response: any) {
    console.log(this.shwFaciDesc.slice(0, 3));

    const result = _response.filter((obj: any) => {
      return obj.F1PK01 === 'B01';
    });
    console.log(result);

    this.wcFinal = result;
    console.log(this.shwWCDesc);
  }

  getBasicData() {
    this.isLoadingText = 'Fetching the Basic data';
    let record: MIRecord = new MIRecord();
    record['CONO'] = this.userData.currentCompany;
    record['DIVI'] = this.userData.currentDivision;
    this.output = ['FACI', 'TX15', 'CONO', 'DIVI'];
    const request: IMIRequest = {
      includeMetadata: true,
      program: 'MNS100MI',
      transaction: 'GetBasicData',
      outputFields: this.output,
      record: record,
      maxReturnedRecords: 0,
    };
    this._miService.execute(request).subscribe((response: IMIResponse) => {
      console.log(response);
      if (!response.hasError()) {
        this.shwFaciDesc = response.item.FACI + ' - ' + response.item.TX15;
        this.shwdivi = this.userData.currentDivision;
        this.isLoading = true;
        this.getFieldValue(this.settings[this.settingIndex]);
      }
    });
  }
  getDiviList() {
    this.isLoadingText = 'Fetching the division list';
    let record: MIRecord = new MIRecord();
    record['CONO'] = this.userData.company;
    let output: string[] = ['TX15', 'DIVI', 'FACI', 'WHLO'];
    this._miService
      .execute({
        includeMetadata: true,
        program: 'MNS100MI',
        transaction: 'LstDivisions',
        record: record,
        outputFields: output,
        maxReturnedRecords: 0,
      })
      .subscribe((response: IMIResponse) => {
        this.lstDivi = response.items;
        this.filterFaciData();
      });
  }
  getLstCmpDivi() {
    this.isLoadingText = 'Fetching the Company and division';
    let record: MIRecord = new MIRecord();
    record['USID'] = this.userData.m3User;
    this.output = ['FACI', 'TX15', 'DIVI', 'WHLO'];
    const request: IMIRequest = {
      includeMetadata: true,
      program: 'MNS150MI',
      transaction: 'LstCmpDivi',
      outputFields: this.output,
      record: record,
      maxReturnedRecords: 0,
    };
    console.log(request);

    this._miService.execute(request).subscribe((response: IMIResponse) => {
      console.log(response);
      if (!response.hasError()) {
        this.defaultDivi = response.item;
        //   let index = 0;
        //   while (index < response.items.length) {
        //     console.log(index);
        //     this.filterFaciData(response.items[index]);
        //     index++;
        //   }
        this.getDiviList();
      }
    });
  }
  getSelect() {
    this.isLoadingText = 'Fetching and inserting the data into the grid';
    let record: MIRecord = new MIRecord();
    record['FACI'] = 'B01';
    record['PLGR'] = this.shwWCDesc.slice(0, 5);
    record['FRDT'] = this.getDateFormatted1();
    record['TODT'] = this.getDateFormatted2();
    this.output = [
      'STDT',
      'MST1',
      'MFN1', // Manufacturing/Production order number
      'PRN1', // PRODUCT
      'V_EXPI',
      'ITDS',
      'ORQ1',
      'MAUN',
      'MAQ1',
      'RORC',
      'WHST',
      'MFTI',
      'BANO',
      'WOS1',
      'OPN1',
      'AUR1',
      'WHLO',
      'ORTY',
      'FIDT',
      'WOS3',
    ];
    const request: IMIRequest = {
      includeMetadata: true,
      program: 'PMS230MI',
      transaction: 'Select',
      outputFields: this.output,
      record: record,
      maxReturnedRecords: 0,
    };
    console.log(request);

    this._miService.execute(request).subscribe((response: IMIResponse) => {
      console.log(response);
      if (!response.hasError()) {
        this.gridRecords(response.items);
      }
    });
  }
  gridRecords(_respRecords: any) {
    console.log(_respRecords);

    let records: MIRecord[] = [];
    for (let _respRecord of _respRecords) {
      if (+_respRecord.WHST < 90) {
        let record: MIRecord = new MIRecord();
        record['PRN1'] = _respRecord.PRN1;
        record['ITDS'] = _respRecord.ITDS;
        record['DIVI'] = '';
        record['MFN1'] = _respRecord.MFN1;
        record['STDT'] = this.getDateFormatted(_respRecord.STDT);
        record['MST1'] = this.getStartTime(_respRecord.MST1);
        record['FIDT'] = this.getDateFormatted(_respRecord.FIDT);
        record['MFTI'] = this.getStopTime(_respRecord.MFTI);
        record['ORQ1'] = _respRecord.ORQ1;
        record['V_EXPI'] = _respRecord.V_EXPI;
        record['MAQ1'] = _respRecord.MAQ1;
        record['MAUN'] = _respRecord.MAUN;
        record['WHST'] = _respRecord.WHST;
        record['RORC'] = _respRecord.RORC;
        record['OPN1'] = _respRecord.OPN1;
        record['WOS3'] = _respRecord.WOS3;
        records.push(record);
      }
    }
    console.log(records);

    this.datagridOptions.dataset = records;
    console.log(this.datagridOptions.dataset);
    this.isLoading = false;
    this.datagridOptions = { ...this.datagridOptions };
    this._workCenterService.storeMainScreenDetails(
      this.datagridOptions.dataset,
      this.selFromDate,
      this.selToDate,
      this.shwFaciDesc
    );
  }

  filterFaciData() {
    console.log(this.defaultDivi);
    console.log(this.lstDivi);

    const result = this.lstDivi.filter((obj: any) => {
      return obj.DIVI === this.defaultDivi.DIVI;
    });
    console.log(this.lstDivi);
    console.log(this.defaultDivi);
    console.log(result);

    if (result) {
      this.faciFinal = result;
      console.log(this.faciFinal);
    }
  }
  onFacility(_faEvent: any) {
    console.log(_faEvent);

    this.shwFaciDesc =
      _faEvent.lookup.selectedRows[0].data.FACI +
      ' - ' +
      _faEvent.lookup.selectedRows[0].data.TX15;
    this.shwdivi = _faEvent.lookup.selectedRows[0].data.DIVI;
    this.isLoading = true;
    this.getFieldValue(this.settings[this.settingIndex]);
  }
  onWorkCenter(_wcEvent: any) {
    console.log(_wcEvent);

    this.shwWCDesc =
      _wcEvent.lookup.selectedRows[0].data.F1PK02 +
      ' - ' +
      _wcEvent.lookup.selectedRows[0].data.PPOPDS;

    this.isWCSelect = true;
    if (this.selFFD && this.selFTD) {
      this.isFTDateApply = false;
    }
    if (!this.datagridOptions.dataset.length) {
      this.isLoading = true;
      this.getSelect();
    }
  }
  whInitColumns() {
    this.columns = [
      {
        width: 150,
        id: 'col-DIVI',
        field: 'DIVI',
        name: 'Division',
        resizable: true,
      },
      {
        width: '',
        id: 'col-WHLO-TX15',
        field: 'TX15',
        name: 'Name',
        resizable: true,
      },
      {
        width: '',
        id: 'col-location',
        field: 'FACI',
        name: 'Facility',
        resizable: true,
      },
      {
        width: '',
        id: 'col-WHLO',
        field: 'WHLO',
        name: 'Warehouse',
        resizable: true,
      },
    ];
  }
  protected init() {
    this.datagridOptions = this.initDataGridOptions(
      'ShopFloor main page',
      this.sfColumns
    );
  }
  public initDataGridOptions(
    title: string,
    columns: SohoDataGridColumn[]
  ): SohoDataGridOptions {
    const options: SohoDataGridOptions = {
      isList: true,
      resultsText: this.customfunction(),
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
        results: true,
        keywordFilter: true,
        collapsibleFilter: true,
        title: title,
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
  customfunction() {
    let send: SohoDataGridResultsTextFunction = (source: 'text', count: 6) => {
      return '(' + count + this.result + ')';
    };
    return send;
  }
  oDataGrid;

  wcInitColumns() {
    this.wcColumns = [
      {
        width: '',
        id: 'col-DIVI',
        field: 'F1PK02',
        name: 'Workcenter',
        resizable: true,
        maxWidth: 2000,
        minWidth: 50,
      },
      {
        width: '',
        id: 'col-WHLO-TX15',
        field: 'PPOPDS',
        name: 'Workcenter Name',
        resizable: true,
      },
    ];
  }
  sfInitColumns() {
    this.sfColumns = [
      {
        width: 100,
        id: 'col-DIVI',
        field: 'PRN1',
        name: 'Product',
        resizable: true,
        maxWidth: 2000,
        minWidth: 50,
      },
      {
        width: 150,
        id: 'col-WHLO-TX15',
        field: 'ITDS',
        name: 'Description',
        resizable: true,
      },
      {
        width: 150,
        id: 'col-DIVI',
        field: 'DIVI',
        name: 'Main Attribute 1',
        resizable: true,
        maxWidth: 2000,
        minWidth: 50,
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
      {
        width: 150,
        id: 'col-WHLO-TX15',
        field: 'MST1',
        name: 'Start time',
        resizable: true,
      },
      {
        width: 150,
        id: 'col-DIVI',
        field: 'FIDT',
        name: 'Finish date',
        resizable: true,
        maxWidth: 2000,
        minWidth: 50,
      },
      {
        width: 150,
        id: 'col-WHLO-TX15',
        field: 'MFTI',
        name: 'Completion Time',
        resizable: true,
      },
      {
        width: 150,
        id: 'col-WHLO-TX15',
        field: 'ORQ1',
        name: 'Order Quantity - Alternative',
        resizable: true,
      },
      {
        width: 150,
        id: 'col-DIVI',
        field: 'V_EXPI',
        name: 'Expiration Date',
        resizable: true,
        maxWidth: 2000,
        minWidth: 50,
      },
      {
        width: 150,
        id: 'col-WHLO-TX15',
        field: 'MAQ1',
        name: 'Delivered Quantity',
        resizable: true,
      },
      {
        width: 150,
        id: 'col-DIVI',
        field: 'MAUN',
        name: 'Production Unit',
        resizable: true,
        maxWidth: 2000,
        minWidth: 50,
      },
      {
        width: 150,
        id: 'col-WHLO-TX15',
        field: 'WHST',
        name: 'Status',
        resizable: true,
      },
      {
        width: 150,
        id: 'col-WHLO-TX15',
        field: 'RORC',
        name: 'Reference Order number',
        resizable: true,
      },
      {
        width: 150,
        id: 'col-WHLO-TX15',
        field: 'OPN1',
        name: 'Operation number',
        resizable: true,
      },
    ];
  }
  diviToolbar() {
    this.toolbar = {
      results: true,
      title: 'Facility List',
      keywordFilter: true,
      actions: true,
      rowHeight: true,
      collapsibleFilter: false,
      fullWidth: true,
    };
  }
  onWCToolbar() {
    this.wcToolbar = {
      results: true,
      title: 'Workcenter',
      keywordFilter: true,
      actions: true,
      rowHeight: true,
      collapsibleFilter: false,
      fullWidth: true,
    };
  }
  onFromDate() {
    console.log(this.selFromDate);

    if (this.selFromDate && this.selToDate) {
      this.isFTDateApply = false;
    }
  }
  onToDate() {
    if (this.selFromDate && this.selToDate) {
      this.isFTDateApply = false;
    }
  }
  onRowSelected(event: any) {
    console.log(event);
    let moNumber: string, reportNumber: string;
    if (event.rows.length > 0) {
      setTimeout(() => {
        moNumber = event.rows[0].data.MFN1;
        reportNumber = event.rows[0].data.WS03;
        this.isReportRcptDisable = false;
        console.log(moNumber);
        this._workCenterService.sendChDetails(
          this.shwWCDesc,
          moNumber,
          reportNumber
        );
      });
      this.isstartMODisable = false;
      if (this.selTR) {
        this.isstartMODisable = false;
      }
    }
  }
  getDateFormatted1() {
    let year = this.selFromDate.slice(0, 4);
    let month = this.selFromDate.slice(5, 7);
    let dd = this.selFromDate.slice(8, 10);
    return year + month + dd;
  }
  getDateFormatted2() {
    let year = this.selToDate.slice(0, 4);
    let month = this.selToDate.slice(5, 7);
    let dd = this.selToDate.slice(8, 10);
    return year + month + dd;
  }

  getDateFormatted(date: string) {
    console.log(date);

    let yyyy = date.slice(0, 4);
    let mm = date.slice(4, 6);
    let dd = date.slice(6, 8);
    return (
      yyyy +
      '-' +
      (mm.length === 2 ? mm : '0' + mm[0]) +
      '-' +
      (dd.length === 2 ? dd : '0' + dd[0])
    );
  }
  getStartTime(startTime: string) {
    return startTime.slice(0, 2) + ':' + startTime.slice(2, 4);
  }
  getStopTime(stopTime: string) {
    return stopTime.slice(0, 2) + ':' + stopTime.slice(2, 4);
  }
}
