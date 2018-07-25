import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Routes, RouterModule } from '@angular/router';
import { InformationService } from '../../../core/information.service';
import { CoreService } from '../../../core/core.service';
import { AccountService } from '../../../core/account.service';
import { ApiRequestResult } from '../../../core/models/apiResult.model';
import { GlobalService } from '../../../core/global.service';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-otpverification-card',
  templateUrl: './otpverification-card.component.html',
  styleUrls: ['./otpverification-card.component.scss']
})
export class OtpverificationCardComponent implements OnInit {
  @Output() ValidationResult = new EventEmitter<boolean>();
  @Input() set SendOTP(sendOTP: boolean) {
    if (sendOTP) {
      this.Resend(0);
      this.globServ.SendLoginOTP = false;
    }
  }
  public otpMessage: string = "";
  public otpValue: string = "";
  public disableButtons: boolean = true;

  public otpSuccesfully: string = "OTP successfully sent. Please check your sms."
  public otpSuccesfullyResent: string = "OTP successfully resent. Please check your sms."
  public otpSuccesfullyError: string = "Could not send OTP. Please contact the Citadel call centre on 086 110 0628."



  constructor(public router: Router, public accServ: AccountService, public coreServ: CoreService, public infoService: InformationService, public globServ: GlobalService) { }

  ngOnInit() {
  }

  public Resend(optionSend: number) {
    let optionSelect: number = optionSend;
    this.otpValue = "";
    this.disableButtons = true;

    this.coreServ.CreateOTP(this.accServ.client.PartyID, 1, "").then(result => {
      this.disableButtons = false;
      if (result.Result) {
        if (optionSelect == 0) {
          this.otpMessage = this.otpSuccesfully;
        } else if (optionSelect == 1) {
          this.otpMessage = this.otpSuccesfullyResent;
        }

      } else {
        this.otpMessage = result.ResultDescription1;
      }
    });
  }

  public Cancel() {
    this.globServ.ShowLoginOTP = false;
    this.globServ.SendLoginOTP = false;
  }

  public Validate() {
    this.otpMessage = "";
    this.coreServ.CheckOTP(this.accServ.client.PartyID, 1, this.otpValue).then(result => {
      if (result.Result == false) {
        this.otpMessage = result.ResultDescription1;
        this.ValidationResult.emit(false);
      } else {
        this.globServ.ShowLoginOTP = false;
        this.globServ.SendLoginOTP = false;
        this.ValidationResult.emit(true);
      }
    });
  }

}
