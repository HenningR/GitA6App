import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs';
import { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { AccountService } from './account.service';
import { AdvisorModel } from './models/advisor.model';
import { LookupModel,ReportCurrencyLookupModel } from './models/lookup.models';
import { Client } from './models/client.model';
import { InvestmentAccountModel } from './models/InvestmentAccount.model';
import {ApiRequestResult} from './models/apiResult.model';


@Injectable({
  providedIn: 'root'
})
export class CoreService {
  //https://www.joshmorony.com/adding-captcha-to-ionic-with-nodejs-middleware/
  public recaptchaSiteKey:string = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
  
  public advisor: AdvisorModel = new AdvisorModel();
  public advisorObj: any;
  public advisorObjLoaded: boolean = false;

  private activeInvestmentAccountsLoaded: boolean = false;
  private activeInvestmentAccountsLoadedExternal: boolean = false;
  public activeInvestmentAccounts: any;
  public activeInvestmentAccountsExternal: any;
  public reportCurrencies:ReportCurrencyLookupModel[] = [];

  public reset() {
    this.advisor = new AdvisorModel();
    this.advisorObj = null;
    this.advisorObjLoaded = false;
    this.activeInvestmentAccounts = null;
    this.activeInvestmentAccountsExternal = null;
    this.activeInvestmentAccountsLoaded = false;
    this.activeInvestmentAccountsLoadedExternal = false;
    this.reportCurrencies = [];
  }

  constructor(public api: ApiService, public account: AccountService) { }

  public getHtmlPart(htmlKey: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      let resultHTML: string = "";
      this.api.load('Core/GetHtmlPart', { htmlPartKey: htmlKey }, {
        success: result => {
          resultHTML = result;

          resolve(resultHTML);
        }
      });
    })
  }

  public getAdvisor(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (this.advisor.ID == "") {
        this.api.load('Core/GetAdvisorData', { clientID: this.account.client.PartyID }, {
          success: results => {
            let advisorModel: AdvisorModel = new AdvisorModel();
            for (const item of results) {
              this.advisor.ID = item.ID;
              this.advisor.PrimaryContact = item.PrimaryContact;
              this.advisor.Sharewith = item.Sharewith;
            }
            resolve(true);
          }
        })
      } else {
        resolve(true);
      }
    })
  }

  public getAdvisorObj(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (this.advisorObjLoaded == false) {
        let resultHTML: string = "";
        this.api.load('Core/GetAdvisorObj', { sid: this.advisor.ID }, {
          success: result => {
            this.advisorObj = result;
            this.advisorObjLoaded = true;
            resolve(true);
          }
        })
      } else {
        resolve(true);
      }
    })
  }

  public GetLookup(TableName: string, alreadyLoaded: boolean): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (alreadyLoaded == false) {
        this.api.load('Core/GetLookup', { tableName: TableName }, {
          success: result => {

            let lookupList: LookupModel[] = [];
            lookupList = result;

            resolve(lookupList.sort((a, b) => {
              if (a.ID > b.ID) {
                return 1;
              } else {
                return -1;
              };
            }));
          }
        });
      } else {
        resolve(true);
      }
    });
  }

  public GetReportCurrencies(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (this.reportCurrencies.length <= 0) {
        this.api.load('Core/GetReportCurrencies',{}, {
          success: result => {

            let lookupList: ReportCurrencyLookupModel[] = [];
            lookupList = result;
            this.reportCurrencies = lookupList.sort((a, b) => {
              if (a.LID > b.LID) {
                return 1;
              } else {
                return -1;
              };
            });

            resolve(true);
          }
        });
      } else {
        resolve(true);
      }
    });
  }

  public getActiveInvestmentClients(option: number): Client[] {
    let clients: Client[] = [];

    if (option == 1) {
      clients = this.activeInvestmentAccountsExternal.Table;
    } else if (option == 2) {
      clients = JSON.parse(JSON.stringify(this.activeInvestmentAccounts.Table));
    } else if (option == 3) {
      let clientsArray1: Client[] = [];
      let clientsArray2: Client[] = [];

      clientsArray1 = JSON.parse(JSON.stringify(this.activeInvestmentAccountsExternal.Table));
      clientsArray2 = JSON.parse(JSON.stringify(this.activeInvestmentAccounts.Table));

      //Get distinct items from both lists
      for (var i = 0; i < clientsArray1.length; i++) {
        var found = false;

        for (var j = 0; j < clientsArray2.length; j++) { // j < is missed;
          if (clientsArray1[i].ClientName == clientsArray2[j].ClientName) {
            found = true;
            break;
          }
        }
        if (found == false) {
          clientsArray2.push(clientsArray1[i]);
        }
      }

      clients = clientsArray2;
    }else if (option == 4) {
      clients = JSON.parse(JSON.stringify(this.activeInvestmentAccounts.Table));
    }

    return clients;
  }


  public getActiveInvestmentAccounts(option: number): InvestmentAccountModel[] {
    let clients: InvestmentAccountModel[] = [];

    if (option == 1) {
      clients = this.activeInvestmentAccountsExternal.Table1;
    } else if (option == 2) {
      clients = JSON.parse(JSON.stringify(this.activeInvestmentAccounts.Table1));

      let totalSumManaged: number = clients.map(c => c.TotalManaged).reduce((sum, current) => sum + current);

      let newAccount: InvestmentAccountModel = new InvestmentAccountModel();
      newAccount.AccountName = "All Accounts";
      newAccount.TotalManaged = totalSumManaged;
      clients.unshift(newAccount);
    } else if (option == 3) {
      let clientsArray1: InvestmentAccountModel[] = [];
      let clientsArray2: InvestmentAccountModel[] = [];

      clientsArray1 = JSON.parse(JSON.stringify(this.activeInvestmentAccountsExternal.Table1));
      clientsArray2 = JSON.parse(JSON.stringify(this.activeInvestmentAccounts.Table1));

      //Get distinct items from both lists
      for (var i = 0; i < clientsArray1.length; i++) {
        var found = false;

        for (var j = 0; j < clientsArray2.length; j++) { // j < is missed;
          if (clientsArray1[i].AccountName == clientsArray2[j].AccountName) {
            found = true;
            break;
          }
        }
        if (found == false) {
          clientsArray2.push(clientsArray1[i]);
        }
      }

      clients = clientsArray2;
      let totalSumManaged: number = clients.map(c => c.TotalManaged).reduce((sum, current) => sum + current);

      let newAccount: InvestmentAccountModel = new InvestmentAccountModel();
      newAccount.AccountName = "All Accounts";
      newAccount.TotalManaged = totalSumManaged;
      clients.unshift(newAccount);

    } else if (option == 4) {
      clients = JSON.parse(JSON.stringify(this.activeInvestmentAccounts.Table1));
    }
    return clients;
  }

  public getActiveInvestmentAccountsAll(ClientID: string, ExternalSupplierOnly: boolean): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {

      if (ExternalSupplierOnly == false) {
        if (this.activeInvestmentAccountsLoaded == false) {
          this.api.load('Reporting/GetActiveInvestmentAccounts', { clientID: ClientID, externalSupplierOnly: ExternalSupplierOnly }, {
            success: result => {
              this.activeInvestmentAccounts = result;
              this.activeInvestmentAccountsLoaded = true;
              resolve(true);
            }
          });
        } else {
          resolve(true);
        }
      } else if (ExternalSupplierOnly == true) {
        if (this.activeInvestmentAccountsLoadedExternal == false) {
          this.api.load('Reporting/GetActiveInvestmentAccounts', { clientID: ClientID, externalSupplierOnly: ExternalSupplierOnly }, {
            success: result => {
              this.activeInvestmentAccountsExternal = result;
              this.activeInvestmentAccountsLoadedExternal = true;
              resolve(true);
            }
          });
        } else {
          resolve(true);
        }
      }
    });
  }

  public SendPasswordResetEMail(emailAddress:string): Promise<ApiRequestResult> {
    return new Promise<ApiRequestResult>((resolve, reject) => {
        this.api.load('Core/SendPasswordResetEMail',{email:emailAddress}, {
          success: result => {
            resolve(result);
          }
        });
    });
  }

  public RegisterClient(idNumber:string,emailAddress:string,cellPhone:String): Promise<ApiRequestResult> {
    return new Promise<ApiRequestResult>((resolve, reject) => {
        this.api.load('Core/RegisterClient',{IDNumber:idNumber,EmailAddress:emailAddress,CellPhone:cellPhone}, {
          success: result => {
            resolve(result);
          }
        });
    });
  }

  public CreateOTP(clientID:string,categoryL:number,cellNumber:String): Promise<ApiRequestResult> {
    return new Promise<ApiRequestResult>((resolve, reject) => {
        this.api.load('Core/CreateOTP',{ClientID:clientID,CategoryL:categoryL,CellNumber:cellNumber}, {
          success: result => {
            resolve(result);
          }
        });
    });
  }  

  public CheckOTP(clientID:string,categoryL:number,OTP:String): Promise<ApiRequestResult> {
    return new Promise<ApiRequestResult>((resolve, reject) => {
        this.api.load('Core/CheckOTP',{ClientID:clientID,CategoryL:categoryL,otp:OTP}, {
          success: result => {
            resolve(result);
          }
        });
    });
  }  


}
