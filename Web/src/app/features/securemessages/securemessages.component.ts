import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ClientnotificationService } from '../../core/clientnotification.service';
import { ClientNotificationModel } from '../../core/models/clientnotifications.model';
import { InformationService } from '../../core/information.service';

import { AccountService } from '../../core/account.service';

class SecureMessage {
  show: Boolean;
  message: string;
  subject: string;
  partyNotificationID: string;
}



@Component({
  selector: 'app-securemessages',
  templateUrl: './securemessages.component.html',
  styleUrls: ['./securemessages.component.css']
})
export class SecuremessagesComponent implements OnInit {
  @ViewChild('textAreaRef') public labelElement: ElementRef;
  @ViewChild('textFooter') public footerElement: ElementRef;

  public clientMessages: ClientNotificationModel[] = [];
  public clientSubMessages: ClientNotificationModel[] = [];
  public alreadyLoaded: boolean = false;
  public secureMessage: SecureMessage = new SecureMessage();
  public newMessageHeight: string = "30px";
  public newMessage: string = "";
  public showArchived = false;



  constructor(public clientnotificationServ: ClientnotificationService, public accountSV: AccountService, public sanitiser: DomSanitizer, protected renderer: Renderer2, public infoService: InformationService) { }

  ngOnInit() {
    this.secureMessage.show = false;
    this.alreadyLoaded = false;
    this.getClientMessages();
    this.autosize();

  }

  public getClientMessages() {
    if (this.alreadyLoaded == false) {
      this.clientnotificationServ.getNotifications(this.accountSV.client.PartyID, 4, null, null, false).then((result) => {

        this.getBaseClientMessages();
        this.alreadyLoaded = true;
      });
    }
  }


  public getArchivedClientMessages(): ClientNotificationModel[] {
    this.showArchived = true;
    if (this.clientnotificationServ.clientNotifications.length > 0) {
      this.clientMessages = this.clientnotificationServ.clientNotifications.filter((item) => item.RefPartyNotificationLevel == 0 && (item.PartyNotificationStatusL == 9)); //deleted
    }
    return this.clientMessages
  }


  public getBaseClientMessages(): ClientNotificationModel[] {
    this.showArchived = false;
    if (this.clientnotificationServ.clientNotifications.length > 0) {
      this.clientMessages = this.clientnotificationServ.clientNotifications.filter((item) => item.RefPartyNotificationLevel == 0 && (item.PartyNotificationStatusL == 3 || item.PartyNotificationStatusL == 4)); //read/unread
    }
    return this.clientMessages
  }

  public getSubClientMessages(partyNotificationID: string, groupSubject: string): ClientNotificationModel[] {

    this.secureMessage.subject = groupSubject;
    this.secureMessage.partyNotificationID = partyNotificationID;

    if (this.clientnotificationServ.clientNotifications.length > 0) {

      this.clientSubMessages = this.clientnotificationServ.clientNotifications.filter((item) => item.RefPartyNotificationBaseID == partyNotificationID || item.PartyNotificationID == partyNotificationID).sort((a, b) => {
        if (a.StampDate != b.StampDate) {
          return -1;
        } else {
          return 1;
        };
      });;
      this.secureMessage.show = true;
    }


    if (this.showArchived == false) {
      this.clientnotificationServ.UpdateNotificationStatus(partyNotificationID, 3, 4, true).then((result) => {
        this.clientMessages.forEach((item) => {
          if (item.PartyNotificationID == partyNotificationID || item.RefPartyNotificationBaseID == partyNotificationID) {
            item.PartyNotificationStatusL = 4;
            item.AnyChildStatusUnread = false;
          }
        });
      });
    }

    setTimeout(() => {
      let elementList = document.querySelectorAll('.textScrollPos');
      let element = elementList[0] as HTMLElement;
      element.scrollIntoView({ behavior: 'smooth' });
    }, 1000);



    return this.clientSubMessages
  }

  public closeMessage() {
    this.clientSubMessages = [];
    this.secureMessage.show = false;
    this.secureMessage.subject = "";
    this.secureMessage.partyNotificationID = "";

  }

  public sentMessage() {

    this.clientnotificationServ.sendNotification(this.accountSV.client.PartyID, 4, this.secureMessage.subject, this.newMessage, 3, this.secureMessage.partyNotificationID, true, false).then((result) => {
      this.clientnotificationServ.getNotifications(this.accountSV.client.PartyID, 4, null, null, false).then((result) => {
        this.getSubClientMessages(this.secureMessage.partyNotificationID, this.secureMessage.subject);
        this.newMessage = "";
      });
    });
  }

  public archiveMessage(partyNotificationID: string) {
    if (confirm("Are you sure you want to archive this message group?")) {
      this.clientnotificationServ.UpdateNotificationStatus(partyNotificationID, 3, 9, true).then((result) => {
        this.getBaseClientMessages();
      });
    }
  }


  public requestSecureChat() {
    if (confirm("Are you sure you want to request a secure chat?")) {
      this.clientnotificationServ.requestSecureChat(this.accountSV.client.PartyID, 4, 0).then((result) => {
        this.infoService.success("Request successfully sent");

      });
    }
  }

  public getSafeHTML(htmlStr: string): string {
    let sanHTML;
    sanHTML = this.sanitiser.bypassSecurityTrustHtml(htmlStr);
    return sanHTML;
  }

  public getSafeHTMLCount(htmlStr: string, lenText: number): string {
    let sanHTML;
    sanHTML = this.sanitiser.bypassSecurityTrustHtml(htmlStr);
    return sanHTML;
  }


  public autosize() {
    if (this.labelElement.nativeElement.scrollHeight < 150) {
      this.renderer.setStyle(this.labelElement.nativeElement, 'height', 'auto');
      this.renderer.setStyle(this.labelElement.nativeElement, 'height', this.labelElement.nativeElement.scrollHeight + "px");
      this.renderer.setStyle(this.footerElement.nativeElement, 'height', this.labelElement.nativeElement.scrollHeight + "px");
    }
  }

}
