import { Component, OnInit, Input, Output, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { DocumentService } from '../../../core/document.service'
import { QuarterlyReportModel } from '../../../core/models/quarterly.model';
import { InformationService } from '../../../core/information.service';

@Component({
  selector: 'app-quaterly-card',
  templateUrl: './quaterly-card.component.html',
  styleUrls: ['./quaterly-card.component.scss']
})
export class QuaterlyCardComponent implements OnInit {
  public quarterlyReports: QuarterlyReportModel[] = [];
  public currentAccountID:string = "";

  @Input() set accountInput(accountID: string) {
    if (this.quarterlyReports.length <= 0) {
      this.docServ.getQuaterlyReports(accountID).then(result => {
        this.quarterlyReports = result;
        this.currentAccountID = accountID;
      });
    }
  }

  constructor(public docServ: DocumentService,public infoServ:InformationService) { }

  ngOnInit() {
  }

  public downloadReport(model:QuarterlyReportModel)
  {

    this.docServ.getQuaterlyReportDoc(model,this.currentAccountID).then(result=>{
      if (result.length > 0)
      {
      this.docServ.DocumentDataByteArr = result;

        this.docServ.openPDFDocument("QuarterlyReport " + model.EndDate.toDateString());
      }else
      {
          this.infoServ.error("No report was found");
      }
    });
  }

}
