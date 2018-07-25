import { Component, OnInit, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router, ActivatedRoute, Routes, RouterModule } from '@angular/router';
import { DocumentService } from '../../../core/document.service';
import { InformationService } from '../../../core/information.service';
import { DocumentByteModel } from '../../../core/models/documentByte.model';

@Component({
  selector: 'app-annual-supplier-card',
  templateUrl: './annual-supplier-card.component.html',
  styleUrls: ['./annual-supplier-card.component.scss']
})
export class AnnualSupplierCardComponent implements OnInit {
  @Input() supplierTable: any;
  @Input() WebReport: any;





  constructor(private router: Router, private docServ: DocumentService, private infoServ: InformationService) { }

  ngOnInit() {
  }

  public getDateFrom(): string {
    let dateValue: Date;
    let dateValueStr: string = "";

    this.WebReport.forEach(result => {
      dateValue = new Date(result.StartDate);
      dateValueStr = dateValue.toDateString();

    });
    return dateValueStr;
  }

  public getDateTo(): string {
    let dateValue: Date;
    let dateValueStr: string = "";

    this.WebReport.forEach(result => {
      dateValue = new Date(result.EndDate);
      dateValueStr = dateValue.toDateString();

    });
    return dateValueStr;
  }


  public getSupplierLevel(level, parentInvestmentID: any): any {
    if (level == 0) {
      let result: any;
      result = this.supplierTable.filter(item => item.LevelID == level);;
      return result.sort((a, b) => {
        if (a.ProductName > b.ProductName) {
          return 1;
        } else {
          return -1;
        };
      });
    } else {

      let result: any;
      result = this.supplierTable.filter(item => item.LevelID == level && item.ParentInvestmentID == parentInvestmentID);
      return result.sort((a, b) => {
        if (a.ProductName > b.ProductName) {
          return 1;
        } else {
          return -1;
        };
      });
    }
  }


  supplierStatementExists(): boolean {
    let result: any;
    result = this.supplierTable.filter(item => item.LevelID == 0 && item.ProductID != 0);
    return result.length > 0;
  }


  changeRoute(routeDesc) {
    this.router.navigate([routeDesc]);
  }

  getFundFactSheet(fundID: number, productName: string) {

    this.docServ.getFundFactSheet(fundID, productName).then(result => {
      if (result.Result) {
        this.docServ.DocumentDataByteArr = result.DocumentData;
        this.docServ.openPDFDocument(result.DocumentName);
      } else {
        this.infoServ.error("Document couldn't be retrieved");
        console.log(result.ResultDescription);
      }
    });
  }


  getSupplierStatement(investmentID: string, contractNumber: string, dateFrom: string, dateTo: string, accountID: string, effectiveDate: string, productID: number) {

    this.docServ.getSupplierStatement(investmentID, contractNumber, dateFrom, dateTo, accountID, effectiveDate, productID).then(result => {
      if (result.Result) {
        this.docServ.DocumentDataByteArr = result.DocumentData;
        this.docServ.openPDFDocument(result.DocumentName);
      } else {
        this.infoServ.error("Document couldn't be retrieved");
        console.log(result.ResultDescription);
      }
    });
  }

  getProductStatement(productID: string, accountID: string, dateEffectiveStr: string) {

    this.docServ.getProductStatement(productID, accountID, dateEffectiveStr).then(result => {
      if (result.Result) {
        this.docServ.DocumentDataByteArr = result.DocumentData;
        this.docServ.openPDFDocument(result.DocumentName);
      } else {
        this.infoServ.error("Document couldn't be retrieved");
        console.log(result.ResultDescription);
      }
    });
  }


}
