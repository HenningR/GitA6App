import { Component, OnInit,Input,Output } from '@angular/core';
import { NgModule } from '@angular/core';
import {CoreService} from '../../../core/core.service'
import { Router, ActivatedRoute, Routes, RouterModule } from '@angular/router';
import {AccountService} from '../../../core/account.service'
import { Client } from '../../../core/models/client.model';
import { InvestmentAccountModel } from '../../../core/models/InvestmentAccount.model';
import {DocumentService} from '../../../core/document.service'
import {QuarterlyReportModel} from '../../../core/models/quarterly.model';


@Component({
  selector: 'app-quaterlyreports',
  templateUrl: './quaterlyreports.component.html',
  styleUrls: ['./quaterlyreports.component.scss']
})
export class QuaterlyreportsComponent implements OnInit {
  public clients:Client[] = [];
  public investmentAccounts:InvestmentAccountModel[] = [];

  constructor(public coreServ:CoreService,public accountServ:AccountService,public router: Router,public docServ:DocumentService) { }

  ngOnInit() {
    this.coreServ.getActiveInvestmentAccountsAll(this.accountServ.client.PartyID,false).then((result)=>{
        this.clients = this.coreServ.getActiveInvestmentClients(4);
        this.investmentAccounts = this.coreServ.getActiveInvestmentAccounts(4);
    });
  }


  changeRoute(routeDesc) {
    this.router.navigate([routeDesc]);
  }

}
