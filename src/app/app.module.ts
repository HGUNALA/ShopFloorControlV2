import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Log } from '@infor-up/m3-odin';
import { M3OdinModule } from '@infor-up/m3-odin-angular';
import { SohoComponentsModule } from 'ids-enterprise-ng'; // TODO Consider only importing individual SoHo modules in production
import { AppComponent } from './app.component';
import { ShopFloorControlComponent } from './shop-floor-control/shop-floor-control.component';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { StartMOComponent } from './start-mo/start-mo.component';
import { StopMoComponent } from './stop-mo/stop-mo.component';
import { StartDisturbanceComponent } from './start-disturbance/start-disturbance.component';
import { StopDisturbanceComponent } from './stop-disturbance/stop-disturbance.component';
import { PlausibilityCheckComponent } from './plausibility-check/plausibility-check.component';
import { ReportIssueComponent } from './report-issue/report-issue.component';
import { BillOfMaterialsComponent } from './bill-of-materials/bill-of-materials.component';

@NgModule({
  declarations: [AppComponent, ShopFloorControlComponent, routingComponents, StartMOComponent, StopMoComponent, StartDisturbanceComponent, StopDisturbanceComponent, PlausibilityCheckComponent, ReportIssueComponent, BillOfMaterialsComponent],
  imports: [
    BrowserModule,
    FormsModule,
    SohoComponentsModule,
    M3OdinModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'en-US',
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (locale: string) => () => {
        Soho.Locale.culturesPath = 'assets/ids-enterprise/js/cultures/';
        return Soho.Locale.set(locale).catch((err) => {
          Log.error('Failed to set IDS locale', err);
        });
      },
      deps: [LOCALE_ID],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
