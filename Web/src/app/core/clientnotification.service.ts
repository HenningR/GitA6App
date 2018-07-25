import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ClientNotificationModel } from './models/clientnotifications.model';

@Injectable({
  providedIn: 'root'
})
export class ClientnotificationService {

  public clientNotifications: ClientNotificationModel[] = [];

  public reset() {
    this.clientNotifications = [];
  }

  constructor(private apiServ: ApiService) { }

  public getNotifications(ClientID: string, NotificationCategoryL: number, NotificationStatusL: number, NotificationTypeL: number, UseLinkedAccounts: boolean): Promise<ClientNotificationModel[]> {
    return new Promise<ClientNotificationModel[]>((resolve, reject) => {
      let resultHTML: string = "";

      this.apiServ.load('Notification/getNotifications', { clientID: ClientID, notificationCategoryL: NotificationCategoryL, notificationStatusL: NotificationStatusL, notificationTypeL: NotificationTypeL, useLinkedAccounts: UseLinkedAccounts }, {
        success: results => {
          this.clientNotifications = [];

          let notificationModel: ClientNotificationModel = new ClientNotificationModel();
          for (const item of results) {
            notificationModel = new ClientNotificationModel();
            notificationModel.DateSent = item.DateSent;
            notificationModel.DisclaimerAction = item.DisclaimerAction;
            notificationModel.DisclaimerActive = item.DisclaimerActive;
            notificationModel.DisclaimerRequired = item.DisclaimerRequired;
            notificationModel.Message = item.Message;
            notificationModel.PartyID = item.PartyID;
            notificationModel.PartyNotificationCategory = item.PartyNotificationCategory;
            notificationModel.PartyNotificationCategoryL = item.PartyNotificationCategoryL;
            notificationModel.PartyNotificationID = item.PartyNotificationID;
            notificationModel.PartyNotificationStatus = item.PartyNotificationStatus;
            notificationModel.PartyNotificationStatusL = item.PartyNotificationStatusL;
            notificationModel.PartyNotificationTypeL = item.PartyNotificationTypeL;
            notificationModel.RefPartyNotificationBaseID = item.RefPartyNotificationBaseID;
            notificationModel.RefPartyNotificationID = item.RefPartyNotificationID;
            notificationModel.RefPartyNotificationLevel = item.RefPartyNotificationLevel;
            notificationModel.SharedTnCID = item.SharedTnCID;
            notificationModel.StampDate = item.StampDate;
            notificationModel.StampStaff = item.StampStaff;
            notificationModel.StampStaffID = item.StampStaffID;
            notificationModel.Subject = item.Subject;

            if (item.RefPartyNotificationLevel == 0){
              notificationModel.AnyChildStatusUnread = false;
            }

            this.clientNotifications.push(notificationModel);
          }
          
          if (this.clientNotifications.length > 0) {
            let loopDone:boolean = false;
            this.clientNotifications.filter((filtItem) => filtItem.RefPartyNotificationLevel == 0).forEach((item) => {
              loopDone = false;
              this.clientNotifications.filter((searchItem) => searchItem.RefPartyNotificationLevel > 0 && searchItem.RefPartyNotificationBaseID == item.PartyNotificationID).forEach((subItem, subidx) => {
                if ((item.PartyNotificationStatusL == 3 || subItem.PartyNotificationStatusL == 3) && loopDone == false ) {
                  item.AnyChildStatusUnread = true;
                  loopDone = true;
                  return;
                }
              })
            });
          }
          


          resolve(this.clientNotifications);

        }
      });
    });
  }




  public sendNotification(ClientID: string, NotificationCategoryL: number, NotificationSubject: string, NotficationMessage: string, NotificationStatusL: number, NotifyIDGuid: string, AdvisorEmail: boolean, AdvisorSMS: boolean): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      let resultHTML: string = "";

      this.apiServ.load('Notification/sendNotification', { 
        clientID: ClientID, 
        notificationCategoryL: NotificationCategoryL, 
        notificationSubject: NotificationSubject, 
        notficationMessage: NotficationMessage, 
        notificationStatusL: NotificationStatusL, 
        notifyIDGuid: NotifyIDGuid, 
        advisorEmail: AdvisorEmail, 
        advisorSMS: AdvisorSMS }, {
        success: results => {
          resolve(true);
        }
      });
    });
  }



  public requestSecureChat( ClientID:string,  NotificationCategoryL:number,  RequestType:number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.apiServ.load('Notification/requestSecureChat', { clientID: ClientID, notificationCategoryL: NotificationCategoryL, requestType: RequestType }, {
        success: results => {
          resolve(true);
        }
      });  
    });
  }

  public UpdateNotificationStatus( NotificationID:string,  NotificationTypeL:number, NotificationStatusL:number,AllRefMessages:boolean): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.apiServ.load('Notification/updateNotificationStatus', { notificationID: NotificationID, notificationTypeL: NotificationTypeL, notificationStatusL: NotificationStatusL,allRefMessages:AllRefMessages }, {
        success: results => {
          resolve(true);
        }
      });  
    });
  }




}

