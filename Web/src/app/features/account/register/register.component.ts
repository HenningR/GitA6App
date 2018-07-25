import { Component, OnInit, NgZone } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router, ActivatedRoute, Routes, RouterModule } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { InformationService } from '../../../core/information.service';
import { CoreService } from '../../../core/core.service';
import {ApiRequestResult} from '../../../core/models/apiResult.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public captchaPassed: boolean = false;
  public captchaResponse: string;
  public emailAddress:string = "";
  public IDNumber:string = "";
  public cellPhone:string = "";
  public requestSend:boolean = false;
  public requestDescription:any;


  constructor(public sanitiser: DomSanitizer,public router: Router, public coreServ: CoreService, public zone: NgZone, public infoService: InformationService) { }

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

  public registerClient() {
    if (this.captchaPassed) {
        this.coreServ.RegisterClient(this.IDNumber,this.emailAddress,this.cellPhone).then(result=>{

          let apiRequest:ApiRequestResult = new ApiRequestResult();
          apiRequest = result;
          if (apiRequest.Result)
          {
            this.requestDescription = this.sanitiser.bypassSecurityTrustHtml(apiRequest.ResultDescription1);
            console.log(apiRequest.ResultDescription2);
            this.requestSend = true;
          } else
          {
            this.infoService.error(apiRequest.ResultDescription1);
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
