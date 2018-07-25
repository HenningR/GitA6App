import { Component, OnInit, NgZone } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router, ActivatedRoute, Routes, RouterModule } from '@angular/router';
import { InformationService } from '../../../core/information.service';
import { CoreService } from '../../../core/core.service';
import { DomSanitizer } from '@angular/platform-browser';
import {ApiRequestResult} from '../../../core/models/apiResult.model';



@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {
  public captchaPassed: boolean = false;
  public captchaResponse: string;
  public emailAddress:string = "";
  public requestSend:boolean = false;
  public requestDescription:any;


  constructor(public sanitiser: DomSanitizer,private router: Router, public coreServ: CoreService, public zone: NgZone, public infoService: InformationService) { }

  ngOnInit() {

  }

  captchaResolved(response: string): void {

    this.captchaPassed = false;
    this.captchaResponse = response;
    if (response != null) {
      this.zone.run(() => {
        this.captchaPassed = true;
        this.captchaResponse = response;
      });
    }
  }

  public forgotPasswordSent() {
    if (this.captchaPassed) {
        this.coreServ.SendPasswordResetEMail(this.emailAddress).then(result=>{
          this.requestSend = true;
          let apiRequest:ApiRequestResult = new ApiRequestResult();
          apiRequest = result;
          if (apiRequest.Result == false){
            this.requestDescription = this.sanitiser.bypassSecurityTrustHtml(apiRequest.ResultDescription1);
          }else
          {
            this.requestDescription = this.sanitiser.bypassSecurityTrustHtml("<p>We have received your request to reset your My Secure Zone password and <br>have sent you an email with further instructions to complete the process.</p>")
          }

        
        });
    } else {
      this.infoService.info("I'm not a robot. Isn't selected");
    }
  }

  public changeRoute(routeDesc) {
    this.router.navigate([routeDesc]);
  }
}
