import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CoreService } from '../../core/core.service';
import { AccountService } from '../../core/account.service';
import { GlobalService } from '../../core/global.service';
import { Router, ActivatedRoute, Routes, RouterModule } from '@angular/router';
import { ClientnotificationService } from '../../core/clientnotification.service'
import { ClientNotificationModel } from '../../core/models/clientnotifications.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  public notificationCount: number = 0;
  public secureMessageCount: number = 0;
  public clientMessages: ClientNotificationModel[] = [];

  constructor(public sanitiser: DomSanitizer, public globalServ: GlobalService, public coreServ: CoreService, private accountSV: AccountService, private clientnotificationServ: ClientnotificationService, private router: Router) { }

  ngOnInit() {
    this.getClientNotificationsCount();
    this.getSecureMessagesCount();

  }


  public getHomeHtml(): string {
    if (this.globalServ.htmlHomeLoaded == false) {
      this.coreServ.getHtmlPart("MyCitadelIntro").then((result) => {
        this.globalServ.htmlHome = this.sanitiser.bypassSecurityTrustHtml(result);
        this.globalServ.htmlHomeLoaded = true;
      });
    }
    return this.globalServ.htmlHome;
  }

  public getClientName(): string {
    return this.accountSV.client.ClientName;
  }


  public getClientNotificationsCount() {
    this.clientnotificationServ.getNotifications(this.accountSV.client.PartyID, 3, 3, 3, true).then((result) => {
      this.notificationCount = result.length;
    });
  }

  public getSecureMessagesCount() {
    this.secureMessageCount = 0;
    let loopDone:boolean = false;

    this.clientnotificationServ.getNotifications(this.accountSV.client.PartyID, 4, null, null, false).then((result) => {
      if (this.clientnotificationServ.clientNotifications.length > 0) {
        this.clientnotificationServ.clientNotifications.filter((filtItem) => filtItem.RefPartyNotificationLevel == 0 && filtItem.AnyChildStatusUnread == true).forEach((item) => {
          this.secureMessageCount += 1;
          
          // loopDone = false;
          // this.clientnotificationServ.clientNotifications.filter((searchItem) => searchItem.RefPartyNotificationLevel > 0 && searchItem.RefPartyNotificationBaseID == item.PartyNotificationID).forEach((subItem, subidx) => {
          //   if ((item.PartyNotificationStatusL == 3 || subItem.PartyNotificationStatusL == 3) && loopDone == false ) {
          //     this.secureMessageCount += 1;
          //     loopDone = true;
          //     return;
          //   }
          // })
        
        });

      }
    });

  }


  changeRoute(routeDesc) {
    this.router.navigate([routeDesc]);
  }



}
