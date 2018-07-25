import { Component, OnInit,Input,Output  } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router, ActivatedRoute, Routes, RouterModule } from '@angular/router';
import {CoreService} from '../../../core/core.service'
import {AccountService} from '../../../core/account.service'
import { Client } from '../../../core/models/client.model';
import { InvestmentAccountModel } from '../../../core/models/InvestmentAccount.model';

@Component({
  selector: 'app-otherplatform',
  templateUrl: './otherplatform.component.html',
  styleUrls: ['./otherplatform.component.scss']
})
export class OtherplatformComponent implements OnInit {

  public clients:Client[] = [];
  public investmentAccounts:InvestmentAccountModel[] = [];

  constructor(public coreServ:CoreService,public accountServ:AccountService,public router: Router) { }

  ngOnInit() {
    this.coreServ.getActiveInvestmentAccountsAll(this.accountServ.client.PartyID,true).then((result)=>{
        this.clients = this.coreServ.getActiveInvestmentClients(1);
        this.investmentAccounts = this.coreServ.getActiveInvestmentAccounts(1);
    });
  }

  changeRoute(routeDesc) {
    this.router.navigate([routeDesc]);
  }

}
