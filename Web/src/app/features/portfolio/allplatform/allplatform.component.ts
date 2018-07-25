import { Component, OnInit,Input,Output } from '@angular/core';
import { NgModule } from '@angular/core';
import {CoreService} from '../../../core/core.service'
import { Router, ActivatedRoute, Routes, RouterModule } from '@angular/router';
import {AccountService} from '../../../core/account.service'
import { Client } from '../../../core/models/client.model';
import { InvestmentAccountModel } from '../../../core/models/InvestmentAccount.model';

@Component({
  selector: 'app-allplatform',
  templateUrl: './allplatform.component.html',
  styleUrls: ['./allplatform.component.scss']
})
export class AllplatformComponent implements OnInit {
  public clients:Client[] = [];
  public investmentAccounts:InvestmentAccountModel[] = [];

  constructor(public coreServ:CoreService,public accountServ:AccountService,public router: Router) { }

  ngOnInit() {
    this.coreServ.getActiveInvestmentAccountsAll(this.accountServ.client.PartyID,false).then((result)=>{
      this.coreServ.getActiveInvestmentAccountsAll(this.accountServ.client.PartyID,true).then((result)=>{
        this.clients = this.coreServ.getActiveInvestmentClients(3);
        this.investmentAccounts = this.coreServ.getActiveInvestmentAccounts(3);
      });
    });
  }

  changeRoute(routeDesc) {
    this.router.navigate([routeDesc]);
  }

}
