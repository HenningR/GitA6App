using MySecureZoneApp.Api.Models.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Web;



namespace MysecureZoneApp.Api.Models
{

    public class ActivityLogFactory
    {
        public static bool AddUserProfile(string sessionID, string username, MySecureZone_Entities db)
        {
            try
            {
                var sessions = from s in db.UserSession
                               where s.UserName == username
                               select s;

                foreach (var item in sessions)
                {
                    db.Entry(item).State = EntityState.Deleted;
                }
                db.SaveChanges();

                UserSession userSession = new UserSession();
                userSession.SessionID = sessionID;
                userSession.UserName = username;
                userSession.StampDate = DateTime.Now;
                userSession.UserSessionID = Guid.NewGuid();
                
                db.Entry(userSession).State = EntityState.Added;
                db.SaveChanges();

                return true;               
            }
            catch (DbEntityValidationException dbEx)
            {
                foreach (var validationErrors in dbEx.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        Trace.TraceInformation("Property: {0} Error: {1}", validationError.PropertyName, validationError.ErrorMessage);
                    }
                }
                return false;
            }
        }

        public static bool ValidateSessionID(string sessionID, string userName, MySecureZone_Entities db)
        {
            var sessions = from s in db.UserSession
                           where s.UserName == userName
                           orderby s.StampDate descending
                           select s;

            if (sessions.Count() > 0)
            {
                string sID = sessions.First().SessionID;

                if (sID == sessionID)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return true;
            }
        }

        public static bool RecordActivityLog(Guid sessionID, Guid userID, string controller, string action, StringBuilder comments, MySecureZone_Entities db)
        {
            try
            {
                if (userID != Guid.Empty)
                {
                    ActivityLog activityLog = new ActivityLog();

                    activityLog.ActivityLogID = Guid.NewGuid();
                    activityLog.SessionID = sessionID;
                    activityLog.UserID = userID;
                    activityLog.Controller = controller;
                    activityLog.Action = action;
                    activityLog.Comments = comments.ToString();
                    activityLog.StampDate = DateTime.Now;

                    db.Entry(activityLog).State = EntityState.Added;
                    db.SaveChanges();

                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (DbEntityValidationException dbEx)
            {
                foreach (var validationErrors in dbEx.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        Trace.TraceInformation("Property: {0} Error: {1}", validationError.PropertyName, validationError.ErrorMessage);
                    }
                }
                return false;
            }
        }
    }
}