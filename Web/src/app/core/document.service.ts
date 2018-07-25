import { Injectable } from '@angular/core';
import { ApiService } from './api.service'
import { DocumentModel } from './models/documents.model';
import { QuarterlyReportModel } from './models/quarterly.model';
import {DocumentByteModel} from './models/documentByte.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  public documents: DocumentModel[] = [];
  public DocumentDataByteArr: ByteString;
  public annualWebReportData: any = null;
  public annualWebReportDataLoaded: boolean = false;
  public annualWebReport: any = null;
  public annualWebReportLoaded: boolean = false;
  public annualWebEACReportData: any = null;
  public annualWebEACReportDataLoaded : boolean = false;
  public annualWebFeeSummaryReportData: any = null;
  public annualWebFeeSummaryReportDataLoaded : boolean = false;

  public reset() {
    this.documents = [];
    this.DocumentDataByteArr = "";
    this.annualWebReportData = null;
    this.annualWebReportDataLoaded = false;
    this.annualWebReport = null;
    this.annualWebReportLoaded = false;
    this.annualWebEACReportData = null;
    this.annualWebEACReportDataLoaded = false;
    this.annualWebFeeSummaryReportData = null;
    this.annualWebFeeSummaryReportDataLoaded = false;
  }


  constructor(public apiServ: ApiService) { }

  public getDocumentByWebCategoryByDistinctCategory(webCategoryDesc: string): DocumentModel[] {

    if (this.documents.length > 0) {
      let items: DocumentModel[] = []
      let documentWebIndicesDesc: String[] = [];

      this.documents.filter((item, idx, arr) => {
        if (item.WebCategoryDesc == webCategoryDesc && documentWebIndicesDesc.indexOf(item.CategoryLDescription, 0) == -1) {
          documentWebIndicesDesc.push(item.CategoryLDescription);
          items.push(item);
        }
      }).sort((a, b) => {
        if (a.CategoryLDescription != b.CategoryLDescription) {
          return -1;
        } else {
          return 1;
        };
      });

      return items;
    } else {
      return this.documents;
    }
  }

  public getDocumentByWebCategoryByDistinctClient(webCategoryDesc: string): DocumentModel[] {


    if (this.documents.length > 0) {
      let items: DocumentModel[] = []
      let clients: String[] = []

      this.documents.filter((item, idx, arr) => {
        if (item.WebCategoryDesc == webCategoryDesc && clients.findIndex((val, idx, arr) => item.ClientSalutation == val) == -1) {
          clients.push(item.ClientSalutation);
          items.push(item);
        }
      }).sort((a, b) => {
        if (a.ClientSalutation != b.ClientSalutation) {
          return -1;
        } else {
          return 1;
        };
      });

      return items;
    } else {
      return this.documents;
    }
  }

  public getDocumentByWebCategoryByDistinctCategoryandClient(CategoryDesc: string, partyID: string): DocumentModel[] {


    if (this.documents.length > 0) {
      let items: DocumentModel[] = []

      this.documents.filter((item, idx, arr) => {
        if (item.CategoryLDescription == CategoryDesc && item.PartyID == partyID) {
          items.push(item);
        }
      }).sort((a, b) => {
        if (a.DateEffective != b.DateEffective) {
          return -1;
        } else {
          return 1;
        };
      });

      return items;
    } else {
      return this.documents;
    }
  }


  public getDocuments(PartyID: string, DateFrom?: Date, DateTo?: Date): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (this.documents.length <= 0) {
        this.apiServ.load('Reporting/getDocuments', { partyID: PartyID, dateFrom: DateFrom, dateTo: DateTo, marketingTypeID: null }, {
          success: result => {
            this.documents = result;
            resolve(true);
          }
        });
      } else {
        resolve(true);
      }
    })
  }

  public getDocumentData(DocumentID: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {

      this.apiServ.load('Reporting/GetDocumentData', { documentID: DocumentID }, {
        success: result => {
          this.DocumentDataByteArr = result;
          resolve(true);
        }
      });

    })
  }

  public openPDFDocument(name) {
    let documentName = name + '.pdf';

    if (this.DocumentDataByteArr != null) {
      this.apiServ.download(this.DocumentDataByteArr, documentName);
    }

  }


  public openExcelDocument(name) {
    let documentName = name + '.xls';

    if (this.DocumentDataByteArr != null) {
      this.apiServ.download(this.DocumentDataByteArr, documentName);
    }

  }

  public getValuationReport(ValuationType: number, ClientID: string, AccountID: string, DateEffective: string, CurrencyL: number, IncludeManagedOnly: boolean, IncludeRelated: boolean, IncludeShares: boolean, ExternalSupplierOnly: boolean): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.apiServ.load('Reporting/getValuationSummary', { valuationType: ValuationType, clientID: ClientID, accountID: AccountID, dateEffectiveStr: DateEffective, currencyL: CurrencyL, includeManagedOnly: IncludeManagedOnly, includeRelated: IncludeRelated, includeShares: IncludeShares, externalSupplierOnly: ExternalSupplierOnly }, {
        success: result => {
          resolve(result);
        }
      });

    });
  }

  public getQuaterlyReports(AccountID: string): Promise<QuarterlyReportModel[]> {
    return new Promise<QuarterlyReportModel[]>((resolve, reject) => {

      this.apiServ.load('Reporting/getLastQuaterlyReports', { accountID: AccountID }, {
        success: result => {
          resolve(result);
        }
      });

    });
  }

  public getQuaterlyReportDoc(model: QuarterlyReportModel, AccountID: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.apiServ.load('Reporting/getQuaterlyReportDoc', { accID: AccountID, startDateStr: model.StartDate.toDateString(), endDateStr: model.EndDate.toDateString(), isAccount: model.IsAccountID }, {
        success: result => {
          resolve(result);
        }
      });

    });
  }


  public getPartyWebReports(ClientID: string, ReportTypeL: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (this.annualWebReportLoaded == false) {
        this.apiServ.load('Reporting/getPartyWebReports', { clientID: ClientID, reportTypeL: ReportTypeL }, {
          success: result => {
            this.annualWebReport = result;
            this.annualWebReportLoaded = true;
            resolve(result);
          }
        });
      } else {
        resolve(true);
      }
    });
  }



  public getAnnualWebReport(ClientID: string, AccountID: string, DateEffective: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {


        this.apiServ.load('Reporting/getAnnualWebReport', { clientID: ClientID, accountID: AccountID, dateEffectiveStr: DateEffective }, {
          success: result => {
            this.annualWebReportData = result;
            this.annualWebReportDataLoaded = true;
            resolve(true);
          }
          
        });

    });
  }



  public getEACReport(PartyWebReportID: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {


        this.apiServ.load('Reporting/GetEACReport', { partyWebReportID: PartyWebReportID}, {
          success: result => {
            this.annualWebEACReportData = result;
            this.annualWebEACReportDataLoaded = true;
            resolve(true);
          }
          
        });

    });
  }

  public getFeeSummaryReport(PartyWebReportID: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        this.apiServ.load('Reporting/GetFeeSummaryReport', { partyWebReportID: PartyWebReportID}, {
          success: result => {
            this.annualWebFeeSummaryReportData = result;
            this.annualWebFeeSummaryReportDataLoaded = true;
            resolve(true);
          }
        });
    });
  }



  public getFundFactSheet(FundID: number, ProductName: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.apiServ.post('Reporting/FundFactSheet', { fundID: FundID, productName: ProductName }).subscribe(
        result => {

        //Pass result back as any. Byte arrar cannot be stringify an parsed again to DocumentByteModel
        //  let obj:any = JSON.stringify(result);
        //  let model:DocumentByteModel =  JSON.parse(obj) as DocumentByteModel;
        //  resolve(model);

        resolve(result);
        });
    });



  }


  public getSupplierStatement(InvestmentID: string, ContractNumber: string,DateFrom:string,DateTo:string,AccountID:string,EffectiveDate:string,ProductID:number): Promise<DocumentByteModel> {
    return new Promise<DocumentByteModel>((resolve, reject) => {
      this.apiServ.load('Reporting/GetSupplierStatement', { investmentID: InvestmentID, contractNumber: ContractNumber,dateFrom:DateFrom,dateTo:DateTo,accountID:AccountID,effectiveDate:EffectiveDate,productID:ProductID }, {
        success: result => {
          resolve(result);
        }
      });

    });
  }


  public getProductStatement(ProductID: string, AccountID: string,DateEffectiveStr:string): Promise<DocumentByteModel> {
    return new Promise<DocumentByteModel>((resolve, reject) => {
      this.apiServ.load('Reporting/GetProductStatement', { productID: ProductID, accountID: AccountID,dateEffectiveStr:DateEffectiveStr }, {
        success: result => {
          resolve(result);
        }
      });

    });
  }





}
