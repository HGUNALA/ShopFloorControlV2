import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillOfMaterialsComponent } from './bill-of-materials/bill-of-materials.component';
import { PlausibilityCheckComponent } from './plausibility-check/plausibility-check.component';
import { ReportIssueComponent } from './report-issue/report-issue.component';
import { ReportReceiptComponent } from './report-receipt/report-receipt.component';
import { ShopFloorControlComponent } from './shop-floor-control/shop-floor-control.component';
import { StartDisturbanceComponent } from './start-disturbance/start-disturbance.component';
import { StartMOComponent } from './start-mo/start-mo.component';
import { StopDisturbanceComponent } from './stop-disturbance/stop-disturbance.component';
import { StopMoComponent } from './stop-mo/stop-mo.component';

const routes: Routes = [
  { path: 'shopFloor', component: ShopFloorControlComponent },
  { path: 'reportReceipt', component: ReportReceiptComponent },
  { path: 'startMo', component: StartMOComponent },
  { path: 'stopMo', component: StopMoComponent },
  { path: 'startDisturbance', component: StartDisturbanceComponent },
  { path: 'stopDisturbance', component: StopDisturbanceComponent },
  { path: 'plausibilityCheck', component: PlausibilityCheckComponent },
  { path: 'reportIssue', component: ReportIssueComponent },
  { path: 'billOfMaterials', component: BillOfMaterialsComponent },
  { path: '', redirectTo: 'shopFloor', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
  ShopFloorControlComponent,
  ReportReceiptComponent,
  StartMOComponent,
  StopMoComponent,
  StartDisturbanceComponent,
  StopDisturbanceComponent,
  PlausibilityCheckComponent,
  BillOfMaterialsComponent,
  ReportIssueComponent,
];
