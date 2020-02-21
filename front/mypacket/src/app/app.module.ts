
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';

import {DpDatePickerModule} from 'ng2-jalali-date-picker';

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


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'aIncome/:type', component: AddtransactionComponent,  },
  { path: 'aExpense/:type', component: AddexpenceComponent },
  { path: 'aDebit/:type', component: AdddebitComponent },
  { path: 'aDemand/:type', component: AdddemandComponent },
  { path: 'lIncomes/:type', component: IncomesComponent },
  { path: 'lExpenses/:type', component: ExpesesComponent },
  { path: 'lDebits/:type', component: DebitsComponent },
  { path: 'lDemands/:type', component: DemandsComponent },
  { path: 'lBanks', component: LbanksComponent },
  { path: 'aBank', component: AbankComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'report', component: ReportComponent }
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
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    [RouterModule.forRoot(routes)],
    DpDatePickerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule],

})

export class AppModule { }
