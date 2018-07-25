import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs';
import { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { MenuParams } from './models/menu-params.model';
import { MenuService } from './menu.service'
import { Client, ClientDetails } from './models/client.model';
import { Http, URLSearchParams, Response, Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public clientLoggedIn: boolean = false;
  public client: Client = new Client();
  public clientDetails: ClientDetails = new ClientDetails();


  public reset() {
    this.clientLoggedIn = false;
    this.client = new Client();
  }


  constructor(private api: ApiService, private menuServ: MenuService) { }

  public isAccountLogin(): boolean {
    return this.clientLoggedIn;
  }

  public loadClientMenu(cun: string, cpw: string,preValidation:boolean): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.login(cun, cpw,preValidation).then((res) => {
        this.clientLoggedIn = this.client.isLoggedIn;
        if (this.client.isLoggedIn) {
          this.MenuItems().then((result) => {
            this.menuServ.menuList = [];
            this.menuServ.menuList = result;

            this.menuServ.showMenu = false;
            resolve(true);
          });
        } else {
          resolve(true);
        }

      });
    })

  }

  private login(cun: string, cpw: string,preValidation:boolean): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.client = new Client();
      this.api.load('Core/LoginClient', { clientUN: cun, clientPW: cpw }, {
        success: result => {
          this.client.ClientName = result.ClientName;
          this.client.EmailAddress = result.EmailAddress;
          if (preValidation == false)
          {
              this.client.isLoggedIn = result.isLoggedIn;
          }
          this.client.PartyID = result.PartyID;
          this.client.ResultAdvancedMessage = result.ResultAdvancedMessage;
          this.client.ResultMessage = result.ResultMessage;
          resolve(true);
        }
      });
    });
  }


  public logOutClient(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.clientLoggedIn = false;
      this.menuServ.menuList = [];
      this.menuServ.showMenu = false;
      this.client = new Client();
      resolve(true);
    });
  }


  public ChangePassword(ClientID: string, nP: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.api.load('Core/ChangePassword', { clientID: ClientID, newPassword: nP }, {
        success: result => {
          resolve(true);
        }
      });
    });
  }


  public GetClientDetails(ClientID: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.clientDetails = new ClientDetails();
      this.api.load('Core/GetClientDetails', { clientID: ClientID }, {
        success: result => {
          this.clientDetails = result;
          resolve(true);
        }
      });
    });
  }


  public SendClientDetails(ClientID: string, user: ClientDetails): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.api.post('Core/SentPersonalMail', { clientID: ClientID, jsonStr: user }).subscribe(
        (result) => {
          resolve(true);
        });
    });
  }


  public MenuItems(): Promise<MenuParams[]> {
    return new Promise<MenuParams[]>((resolve, reject) => {
      let menuItems: MenuParams[] = [];
      let param: MenuParams = new MenuParams();
      this.api.load('Core/GetMenuItems', { partyID: this.client.PartyID, siteColID: 1, useAdmin: false, currentUserID: 1100 }, {
        success: result => {
          for (const item of result) {
            menuItems.push(item);
          }
          resolve(menuItems);
        }
      });
    })
  }

}
