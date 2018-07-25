import { Component, OnInit, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import { DocumentService } from '../../../core/document.service';

@Component({
  selector: 'app-annual-eac-card',
  templateUrl: './annual-eac-card.component.html',
  styleUrls: ['./annual-eac-card.component.scss']
})
export class AnnualEacCardComponent implements OnInit {

  public EACTables: any;
  public EACTableColumns: string[] = [];
  public commentNumber: number = 0;
  public investment: number = 0;
  public advise: number = 0;
  public administration: number = 0;
  public other: number = 0;



  @Input() set WebReport(value: any) {
    let webID: string = value[0].PartyWebReportID;
    this.commentNumber = 0;

    this.docServ.getEACReport(value[0].PartyWebReportID).then(result => {
      

      this.docServ.getFeeSummaryReport(value[0].PartyWebReportID).then(result => {  

        this.EACTables = this.docServ.annualWebEACReportData;
      });

    });
  }


  getTableColumns(dataTbl: any, includeAll: boolean): string[] {
    this.EACTableColumns = [];
    let tableColumns: string[] = [];
    let obj: any = dataTbl;
    Object.keys(obj).forEach((key, index) => {
      if (includeAll) {
        tableColumns.push(key);
      } else {
        if (key.indexOf("gen_") < 0) {
          tableColumns.push(key);
        }
      }
    });
    this.EACTableColumns = tableColumns;
    return tableColumns;
  }


  checkIfCommentExist(eacDT: any, dataColumn: string, eacDR: any): boolean {

    let commentExist: boolean = false;
    if (dataColumn == "Impact of Charges") {

      if (eacDR[dataColumn] == "Investment Management" && eacDT[0]["gen_Comments_InvestmentManagementCharges"] != "") {
        this.investment = this.commentNumber;
        commentExist = true;
      }
      if (eacDR[dataColumn] == "Advice" && eacDT[0]["gen_Comments_AdviceCharges"] != "") {
        this.advise = this.commentNumber;
        commentExist = true;
      }
      if (eacDR[dataColumn] == "Administration" && eacDT[0]["gen_Comments_AdministrationCharges"] != "") {
        this.administration = this.commentNumber;
        commentExist = true;
      }
      if (eacDR[dataColumn] == "Other" && eacDT[0]["gen_Comments_OtherCharges"] != "") {
        this.other = this.commentNumber;
        commentExist = true;
      }
    }
    if (commentExist) {
      this.commentNumber += 1;
    }

    return false;
  }


  replaceAll(str, find, replace) {
    let result: string = str;
    result = str.replace(new RegExp(find, 'g'), replace);
    return result;
  }

  checkIfNumber(value: string): boolean {
    let isNumber: boolean = false;
    let patternA: RegExp = new RegExp(/^-{0,1}\d+$/);
    let patternB: RegExp = new RegExp(/^\d+\.\d+$/);
    let patternC: RegExp = new RegExp(/^\d+$/);

    var arrayA = patternA.exec(value);
    var arrayB = patternB.exec(value);
    var arrayC = patternC.exec(value);

    if (arrayA != null) {
      //valid integer (positive or negative)
      isNumber = true;
    } else if (arrayB != null) {
      //valid float
      isNumber = true;
    } else if (arrayC != null) {
      //valid float
      isNumber = true;
    } else {
      //not valid number
      isNumber = false;
    }
    return isNumber;
  }

  constructor(public docServ: DocumentService) { }

  ngOnInit() {


  }

}
