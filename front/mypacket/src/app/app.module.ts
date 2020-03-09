
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { Auth } from "./auth";

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';

import { DpDatePickerModule } from 'ng2-jalali-date-picker';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ReportComponent } from './report/report.component';
import { AddtransactionComponent } from './addtransaction/addtransaction.component';
import { AddexpenceComponent } from './addexpence/addexpence.component';
import { AdddebitComponent } from './adddebit/adddebit.component';
import { AdddemandComponent } from './adddemand/adddemand.component';
import { IncomesComponent } from './incomes/incomes.component';
import { ExpesesComponent } from './expeses/expeses.component';
import { DebitsComponent } from './debits/debits.component';
import { DemandsComponent } from './demands/demands.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { LbanksComponent } from './lbanks/lbanks.component';
import { AbankComponent } from './abank/abank.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChangeBankComponent } from './change-bank/change-bank.component';
import { ChangeTransactionComponent } from './change-transaction/change-transaction.component';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'aIncome/:type', component: AddtransactionComponent, canActivate: [Auth] },
  { path: 'aExpense/:type', component: AddexpenceComponent, canActivate: [Auth] },
  { path: 'aDebit/:type', component: AdddebitComponent, canActivate: [Auth] },
  { path: 'aDemand/:type', component: AdddemandComponent, canActivate: [Auth] },
  { path: 'lIncomes/:type', component: IncomesComponent, canActivate: [Auth] },
  { path: 'lExpenses/:type', component: ExpesesComponent, canActivate: [Auth] },
  { path: 'lDebits/:type', component: DebitsComponent, canActivate: [Auth] },
  { path: 'lDemands/:type', component: DemandsComponent, canActivate: [Auth] },
  { path: 'lBanks', component: LbanksComponent, canActivate: [Auth] },
  { path: 'aBank', component: AbankComponent, canActivate: [Auth] },
  { path: 'register', component: RegisterComponent },
  { path: 'report', component: ReportComponent, canActivate: [Auth] },
  { path: 'changeBank/:id', component: ChangeBankComponent, canActivate: [Auth] },
  { path: 'changeTransaction/:id', component: ChangeTransactionComponent, canActivate: [Auth] }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ReportComponent,
    AddtransactionComponent,
    AddexpenceComponent,
    AdddebitComponent,
    AdddemandComponent,
    IncomesComponent,
    ExpesesComponent,
    DebitsComponent,
    DemandsComponent,
    SidemenuComponent,
    LbanksComponent,
    AbankComponent,
    LoginComponent,
    RegisterComponent,
    ChangeBankComponent,
    ChangeTransactionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    [RouterModule.forRoot(routes)],
    DpDatePickerModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule],

})

export class AppModule { }
