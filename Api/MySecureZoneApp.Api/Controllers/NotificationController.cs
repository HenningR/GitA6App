using MySecureZoneApp.Api.Models;
using MySecureZoneApp.Api.TyrusNotificationService;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MySecureZoneApp.Api.Controllers
{
    public class NotificationController : ApiController
    {
        [HttpGet]
        public DataTable getNotifications(Guid clientID, short? notificationCategoryL, short? notificationStatusL, short? notificationTypeL, bool useLinkedAccounts)
        {
            DataTable notificationObj = new DataTable();

            TyrusNotificationService.ClientNotificationServiceClient notificationServ = new TyrusNotificationService.ClientNotificationServiceClient();
            notificationServ.switchUser(1100);
            string notificationsJSON = notificationServ.GetNotifications(clientID, notificationCategoryL, notificationStatusL, notificationTypeL, useLinkedAccounts);

            notificationObj = (DataTable)Newtonsoft.Json.JsonConvert.DeserializeObject(notificationsJSON, typeof(DataTable));

            return notificationObj;
        }

        [HttpGet]
        public string sendNotification(string clientID, short notificationCategoryL, string notificationSubject, string notficationMessage, short notificationStatusL, string notifyIDGuid, bool advisorEmail, bool advisorSMS)
        {
            string result = "";

            TyrusNotificationService.ClientNotificationServiceClient notificationServ = new TyrusNotificationService.ClientNotificationServiceClient();
            notificationServ.switchUser(1100);
            if (notificationServ.SendNotification(new Guid(clientID), notificationCategoryL, notificationSubject, notficationMessage, notificationStatusL, new Guid(notifyIDGuid), advisorEmail, advisorSMS, out result))
            {
            }

            return result;
        }

        [HttpGet]
        public bool requestSecureChat(string clientID, short notificationCategoryL, short requestType)
        {
            string resultStatus = "";

            TyrusNotificationService.ClientNotificationServiceClient notificationServ = new TyrusNotificationService.ClientNotificationServiceClient();
            notificationServ.switchUser(1100);
            bool bResult = notificationServ.RequestSecureChat(new Guid(clientID), notificationCategoryL, requestType, out resultStatus);

            return bResult;
        }

        [HttpGet]
        public bool updateNotificationStatus(string notificationID,short notificationTypeL, short notificationStatusL,bool allRefMessages)
        {
            TyrusNotificationService.ClientNotificationServiceClient notificationServ = new TyrusNotificationService.ClientNotificationServiceClient();
            notificationServ.switchUser(1100);
            bool bResult = notificationServ.UpdateNotificationStatus(new Guid(notificationID), notificationTypeL, notificationStatusL, allRefMessages);
            return bResult;
        }






    }
}