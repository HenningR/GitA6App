import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ClientnotificationService } from '../../core/clientnotification.service';
import { ClientNotificationModel } from '../../core/models/clientnotifications.model';
import { AccountService } from '../../core/account.service';


class NotificationMessage {
  show: Boolean;
  message;
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  public clientNotifications: ClientNotificationModel[] = [];
  public alreadyLoaded: boolean = false;
  public notificationMessage: NotificationMessage = new NotificationMessage();


  constructor(public clientnotificationServ: ClientnotificationService, public accountSV: AccountService,public sanitiser: DomSanitizer) { }

  ngOnInit() {
    this.notificationMessage.show = false;
    this.alreadyLoaded = false;
    this.getClientNotifications();
  }


  public showNotification(message) {
    this.notificationMessage.show = true;
    this.notificationMessage.message = this.sanitiser.bypassSecurityTrustHtml(message);
  }

  public closeNotification() {
    this.notificationMessage.show = false;
    this.notificationMessage.message = "";
  }

  public getClientNotifications() {
    if (this.alreadyLoaded == false) {
      this.clientnotificationServ.getNotifications(this.accountSV.client.PartyID, 3, 3, 3, true).then((result) => {
        this.clientNotifications = result;
        this.alreadyLoaded = true;

      });
    }
  }

}
