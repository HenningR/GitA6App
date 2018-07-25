import { Component, OnInit, Input, Output } from '@angular/core';
import {CoreService} from '../../../core/core.service';
import {DocumentService} from '../../../core/document.service';
import {AccountService} from '../../../core/account.service';
import { InvestmentAccountModel } from '../../../core/models/InvestmentAccount.model';

class platformCard{

  CurrencyL:number = 0;
  reportDate:Date = new Date();
  includeRelatedEntities:boolean = false;
  includeInvestments:boolean = false;
  includeShareBreakdown:boolean = false;

}

@Component({
  selector: 'app-platform-card',
  templateUrl: './platform-card.component.html',
  styleUrls: ['./platform-card.component.scss']
})
export class PlatformCardComponent implements OnInit {
  @Input() ShowAccountInfo = true;
  @Input() currentAccount:InvestmentAccountModel;
  @Input() showIncludeOtherInvestments:boolean = false;

  public card:platformCard = new platformCard();


  constructor(public coreServ:CoreService,public docServ:DocumentService,public accServ:AccountService) { }

  ngOnInit() {

    this.coreServ.GetReportCurrencies().then((result)=>{});
    
  }

  public viewValuation(valuationType:number){
    this.docServ.getValuationReport(valuationType,this.currentAccount.PartyID,this.currentAccount.AccountID,this.card.reportDate.toDateString(),this.currentAccount.CurrencyL,false,this.card.includeRelatedEntities,this.card.includeShareBreakdown,false ).then((result)=>{
      if (valuationType == 2)
      {
        this.docServ.DocumentDataByteArr = result;
        this.docServ.openExcelDocument("ValuationReport " + this.card.reportDate.toDateString());
      } else if (valuationType == 3)
      {
        this.docServ.DocumentDataByteArr = result;
        this.docServ.openPDFDocument("ValuationReport " + this.card.reportDate.toDateString());
      }
    });
  }
}
