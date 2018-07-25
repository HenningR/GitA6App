import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { ClientnotificationService } from './clientnotification.service';
import { CoreService } from './core.service';
import { DocumentService } from './document.service';
import { MenuService } from './menu.service';
import { LookupModel } from './models/lookup.models';
import { ClientDetails } from './models/client.model';

//Mainly used to keep global state of variables
@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public htmlHomeLoaded: boolean = false;
  public htmlHome: any;
  public lkpSharedLanguages: LookupModel[] = [];
  public lkpPartyTitles: LookupModel[] = [];
  public ShowLoginOTP:boolean = false;
  public SendLoginOTP:boolean = false;


  public reset() {
    this.htmlHomeLoaded = false;
    this.htmlHome = "";
    this.lkpSharedLanguages = [];
    this.lkpPartyTitles = [];

    this.SendLoginOTP = false;
    this.ShowLoginOTP = false;

    this.accServ.reset();
    this.clientNotificationServ.reset();
    this.coreServ.reset();
    this.docServ.reset();
    this.menuServ.reset();
  }


  constructor(private accServ: AccountService, private clientNotificationServ: ClientnotificationService, private coreServ: CoreService, private docServ: DocumentService, private menuServ: MenuService) { }
}
