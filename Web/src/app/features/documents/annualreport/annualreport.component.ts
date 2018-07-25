import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { AccountService } from '../../../core/account.service';
import { DocumentService } from '../../../core/document.service';
import { DomSanitizer } from '@angular/platform-browser';

class AnnualReportModel{
  reportHeading:any;
  reportAddressDetail:any;
  reportPersonalSituation:any;

}


@Component({
  selector: 'app-annualreport',
  templateUrl: './annualreport.component.html',
  styleUrls: ['./annualreport.component.scss']
})
export class AnnualreportComponent implements OnInit {

  public webReports:any;
  public showAllReports:boolean = true;
  public showReportDetail:boolean = false;
  public anualDataTable1:any;
  public anualDataTable2:any;
  public anualDataTable3:any;
  public anualDataTable4:any;
public anualReportData:AnnualReportModel = new AnnualReportModel();


  constructor(private docServ:DocumentService,private accServ:AccountService,public sanitiser: DomSanitizer) { }

  ngOnInit() {
    this.docServ.getPartyWebReports(this.accServ.client.PartyID,1).then(result=>{
      this.webReports = this.docServ.annualWebReport.Table;

    });
    
  }


  public openReport(report:any){

    
    let EffectiveDate:Date = new Date(report.EffectiveDate);
    let EffectiveDateStr:string = EffectiveDate.toDateString();

      this.docServ.getAnnualWebReport(this.accServ.client.PartyID,report.AccountID,EffectiveDateStr).then((result)=>{
        this.anualDataTable1 = this.docServ.annualWebReportData.Table;
        this.anualDataTable2 = this.docServ.annualWebReportData.Table1;
        this.anualDataTable3 = this.docServ.annualWebReportData.Table2;
        this.anualDataTable4 = this.docServ.annualWebReportData.Table3;


        
        this.anualDataTable1.forEach(element => {
          this.anualReportData.reportHeading = this.sanitiser.bypassSecurityTrustHtml(element.Column1);
          this.anualReportData.reportAddressDetail = this.sanitiser.bypassSecurityTrustHtml(element.Column2);
          this.anualReportData.reportPersonalSituation = this.sanitiser.bypassSecurityTrustHtml(element.Column3);

          this.showAllReports = false;
          this.showReportDetail = true;
        });
    


      })
  }



}
