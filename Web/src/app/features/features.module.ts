import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './account/login/login.component';
import { HomeComponent } from './home/home.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { MyvaultComponent } from './documents/myvault/myvault.component';
import { SharedModule } from '../shared/shared.module';
import { AdvisorComponent } from './advisor/advisor.component';
import { IndicatorsComponent } from './markets/indicators/indicators.component';
import { TradingComponent } from './markets/trading/trading.component';
import { SecuremessagesComponent } from './securemessages/securemessages.component';
import { ChangePasswordComponent } from './account/change-password/change-password.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { CitadelplatformComponent } from './portfolio/citadelplatform/citadelplatform.component';
import { OtherplatformComponent } from './portfolio/otherplatform/otherplatform.component';
import { AllplatformComponent } from './portfolio/allplatform/allplatform.component';
import { PlatformCardComponent } from './portfolio/platform-card/platform-card.component';
import { QuaterlyreportsComponent } from './portfolio/quaterlyreports/quaterlyreports.component';
import { QuaterlyCardComponent } from './portfolio/quaterly-card/quaterly-card.component';
import { ForgetpasswordComponent } from './account/forgetpassword/forgetpassword.component';
import { RegisterComponent } from './account/register/register.component';
import { OtpverificationCardComponent } from './account/otpverification-card/otpverification-card.component';
import { AnnualreportComponent } from './documents/annualreport/annualreport.component';
import { AnnualConfirmationCardComponent } from './documents/annual-confirmation-card/annual-confirmation-card.component';
import { AnnualSupplierCardComponent } from './documents/annual-supplier-card/annual-supplier-card.component';
import { AnnualEacCardComponent } from './documents/annual-eac-card/annual-eac-card.component';
import { AnnualFeesummaryCardComponent } from './documents/annual-feesummary-card/annual-feesummary-card.component';
import { InformationComponent } from '../frame/information/information.component';
import { RecaptchaModule } from 'ng-recaptcha';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RecaptchaModule.forRoot()
  ],
  declarations: [
    LoginComponent,HomeComponent
    , NotificationsComponent, MyvaultComponent, AdvisorComponent
    , IndicatorsComponent, TradingComponent, SecuremessagesComponent
    , ChangePasswordComponent, PersonalDetailsComponent
    , CitadelplatformComponent, OtherplatformComponent, AllplatformComponent
    , PlatformCardComponent, QuaterlyreportsComponent, QuaterlyCardComponent
    , ForgetpasswordComponent, RegisterComponent, OtpverificationCardComponent
    , AnnualreportComponent, AnnualConfirmationCardComponent, AnnualSupplierCardComponent, AnnualEacCardComponent, AnnualFeesummaryCardComponent,InformationComponent
  ],
  exports: [
    LoginComponent,HomeComponent
    , NotificationsComponent
    , MyvaultComponent
    , AdvisorComponent
    , IndicatorsComponent
    , TradingComponent
    , SecuremessagesComponent
    , ChangePasswordComponent
    , PersonalDetailsComponent
    , CitadelplatformComponent
    , OtherplatformComponent
    , AllplatformComponent
    , PlatformCardComponent
    , QuaterlyreportsComponent
    ,QuaterlyCardComponent
    ,ForgetpasswordComponent
    ,RegisterComponent
    ,OtpverificationCardComponent
    ,AnnualreportComponent
    , AnnualConfirmationCardComponent, AnnualSupplierCardComponent, AnnualEacCardComponent,AnnualFeesummaryCardComponent,InformationComponent,RecaptchaModule
  ]
})
export class FeaturesModule { }

export {
  LoginComponent,HomeComponent
  , NotificationsComponent
  , MyvaultComponent
  , AdvisorComponent
  , IndicatorsComponent
  , TradingComponent
  , SecuremessagesComponent
  , ChangePasswordComponent
  , PersonalDetailsComponent
  , CitadelplatformComponent
  , OtherplatformComponent
  , AllplatformComponent
  , PlatformCardComponent
  , QuaterlyreportsComponent
  ,QuaterlyCardComponent
  ,ForgetpasswordComponent
  ,RegisterComponent
  ,OtpverificationCardComponent
  ,AnnualreportComponent
  , AnnualConfirmationCardComponent, AnnualSupplierCardComponent, AnnualEacCardComponent,AnnualFeesummaryCardComponent,InformationComponent
}