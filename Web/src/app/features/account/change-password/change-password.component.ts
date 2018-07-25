import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { AccountService } from '../../../core/account.service';
import { CoreService } from '../../../core/core.service';
import { InformationService } from '../../../core/information.service';
import { GlobalService } from '../../../core/global.service';



@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

public userName:string = "";
public psw:string = "";
public userPsw:string = "";
public confirmPsw:string = "";


  constructor(public accountServ:AccountService,public infoService: InformationService, public globalServ: GlobalService) { }

  ngOnInit() {
    this.userName = this.accountServ.client.ClientName;
  }

  UpdatePsw(){
     let result = this.checkPassword();
      if (result == "Passwords match")
      {
          //this.accountServ.ChangePassword(this.accountServ.client.PartyID,this.userPsw).then((result)=>{
          //  this.infoService.success("Password updated successfully.");
          //});
          this.globalServ.ShowLoginOTP = true;
          this.globalServ.SendLoginOTP = true;
      }else
      {
          this.infoService.error(result);
      }
  }


  ValidationResult(validationResult: boolean) {
    if (validationResult) {

      this.accountServ.ChangePassword(this.accountServ.client.PartyID,this.userPsw).then((result)=>{
        this.globalServ.ShowLoginOTP = false;
        this.globalServ.SendLoginOTP = false;
        this.infoService.success("Password updated successfully.");
      });

    }
  }

  private checkPassword():string {
    let result:string = "";
    if ((this.userPsw != this.confirmPsw) || this.userPsw.length < 8 || this.userPsw.length < 8) {

			if ((this.userPsw != this.confirmPsw) && this.confirmPsw != "") {
				result = "Passwords don't match";
			}
			else if (this.userPsw != "") {
        result = "Passwords match";
			}

			if (this.userPsw == "") {
				result = "Password empty";
			}

			if (this.confirmPsw == "") {
				result = "Confirm password empty";
			}
		}
		else {
			result = "Passwords match";
    }
    return result;
  }

}
