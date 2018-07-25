import { Component, OnInit, Input, Output } from '@angular/core';
import { Router, ActivatedRoute, Routes, RouterModule } from '@angular/router';
import { AccountService } from '../../../core/account.service';
import { MenuParams } from '../../../core/models/menu-params.model';
import { MenuService } from '../../../core/menu.service';
import { GlobalService } from '../../../core/global.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public userName: string = "";
  public userPsw: string = "";
  public loginSanHTML: string = "";



  constructor(public sanitiser: DomSanitizer, public accountSV: AccountService, public menuServ: MenuService, public router: Router, public globalServ: GlobalService) { }

  ngOnInit() {
  }

  public loginClient() {
    this.globalServ.reset();
    this.accountSV.loadClientMenu(this.userName, this.userPsw, true).then((result) => {
      this.globalServ.ShowLoginOTP = true;
      this.globalServ.SendLoginOTP = true;
    });
  }

  ValidationResult(validationResult: boolean) {
    if (validationResult) {
      this.accountSV.loadClientMenu(this.userName, this.userPsw, false).then((result) => {
        if (result) {
          this.loginSanHTML = this.sanitiser.sanitize(1, this.accountSV.client.ResultMessage);
          this.router.navigate(['/home']);
          this.globalServ.ShowLoginOTP = false;
          this.globalServ.SendLoginOTP = false;

        }
      });
    }
  }

  changeRoute(routeDesc) {
    this.router.navigate([routeDesc]);
  }

  public TestLogin() {
    this.globalServ.reset();

    
    //this.accountSV.loadClientMenu("timross@netactive.co.za", "support123", false).then((result) => {
      this.accountSV.loadClientMenu("alibuss@worldonline.co.za", "support123", false).then((result) => {
      if (result) {
        this.loginSanHTML = this.sanitiser.sanitize(1, this.accountSV.client.ResultMessage);

        this.router.navigate(['/home']);

      }
    });
  }

}
