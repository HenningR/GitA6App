import { Component, OnInit, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import { DocumentService } from '../../../core/document.service';

@Component({
  selector: 'app-annual-feesummary-card',
  templateUrl: './annual-feesummary-card.component.html',
  styleUrls: ['./annual-feesummary-card.component.scss']
})
export class AnnualFeesummaryCardComponent implements OnInit {

  public feeSummaryReportDS: any[] = [];
  public feeSummaryReportHeaderDS: any[] = [];
  public feeSummaryReportTableNames: string[] = [];
  public FeeSummaryTableColumns: string[] = [];
  public commentNumber: number = 0;
  public commentExist:number = 0;
  public investment: number = 0;
  public advise: number = 0;
  public administration: number = 0;
  public other: number = 0;

  public investmentExists:boolean = false;
  public adviseExists:boolean = false;
  public administrationExists:boolean = false;
  public otherExists:boolean = false;
  public currentColumn:string = "";
  public nextColumn:string = "";
  public previousColumn:string = "";



  @Input() set contractNumber(value: string) {
    this.commentNumber = 0;
    let FeeSummaryTables: any = this.docServ.annualWebFeeSummaryReportData;

    let totTables: number = FeeSummaryTables.length;
    let totheaderTables: number = FeeSummaryTables.length / 3;
    let totdataTables: number = totheaderTables * 2;


    let headerCount: number = 0;
    let dataCount: number = 0;


    let contractIdx = 0;

    for (let idx: number = totdataTables; idx < totTables; idx++) {
      this.feeSummaryReportTableNames.push(FeeSummaryTables[idx]);
    }

    for (let idx: number = 0; idx <= totTables; idx++) {
      if (idx < totheaderTables) {
        if (this.feeSummaryReportTableNames[headerCount].indexOf(value) >= 0 ) {
          this.feeSummaryReportHeaderDS.push(FeeSummaryTables[idx]);
        }
        headerCount += 1;
      } else if (idx >= totheaderTables && idx < totdataTables) {
        if (this.feeSummaryReportTableNames[dataCount].indexOf(value) >= 0) {
          this.feeSummaryReportDS.push(FeeSummaryTables[idx]);
        }
        dataCount += 1;
      } else if (idx >= totdataTables) {

        //this.feeSummaryReportTableNames.push(FeeSummaryTables[idx]);

      }
    }

  };





  getTableColumns(dataTbl: any, includeAll: boolean): string[] {
    this.FeeSummaryTableColumns = [];
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
    this.FeeSummaryTableColumns = tableColumns;
    return tableColumns;
  }

checkValueContains(value:any,searchStr:string):boolean{
let result:boolean = value.indexOf(searchStr) >= 0;

    return result;
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

  setProperty(value:string,newValue:any){

    if (value == 'currentColumn'){
      this.currentColumn = newValue;
    }
    if (value == 'nextColumn'){
      this.nextColumn = newValue;
    }
    if (value == 'investment'){
      this.investment = newValue;
    }
    if (value == 'commentExist'){
      this.commentExist = newValue;
    }
    if (value == 'commentNumber'){
      this.commentNumber = newValue;
    }
    

    if (value == 'advise'){
      this.advise = newValue;
    }    
    if (value == 'administration'){
      this.administration = newValue;
    }  
    if (value == 'other'){
      this.other = newValue;
    }  
    if (value == 'previousColumn'){
      this.previousColumn = newValue;
    }  
    if (value == 'otherExists'){
      this.otherExists = newValue;
    }  
    if (value == 'administrationExists'){
      this.administrationExists = newValue;
    }  
    if (value == 'adviseExists'){
      this.adviseExists = newValue;
    }  
    if (value == 'investmentExists'){
      this.investmentExists = newValue;
    }  

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
