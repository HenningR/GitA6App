using MySecureZoneApp.Api.Models;
using MySecureZoneApp.Api.TyrusClientAuthService;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Cryptography.Xml;
using System.Threading.Tasks;
using System.Web.Http;

namespace MySecureZoneApp.Api.Controllers
{
    public class CoreController : ApiController
    {
        [HttpGet]
        public dynamic LoginClient(string clientUN, string clientPW)
        {
            UserModel usrModel = new UserModel();
            usrModel.isLoggedIn = false;
            usrModel.ResultMessage = "UnSuccesful";
            try
            {
                short lockoutTimeRemaining = 0;
                string clientName = "";
                bool isActve = false;
                bool isValidated = false;
                short webApplicationL = 1;
                string emailAddress = "";
                int staffID = 1100;
                string isMobile = "Yes";

                string browser = "Platform : MySecureZone Mobile App" + ", Browser : Unknown" + ", Version : 1.0 " + ", Mobile: " + isMobile;
                Guid partyID = Guid.Empty;

                //TyrusAuthenticationService.UserAuthLoginTokenClient tyrusAuthenticationService = new TyrusAuthenticationService.UserAuthLoginTokenClient();
                //tyrusAuthenticationService.AuthLoginCreation(model.UserName, model.Password, browser, ref clientName, ref lockoutTimeRemaining, ref webApplicationL, out partyID, out IDNumber);

                TyrusClientAuthService.ClientAuthServiceClient tyrusClientService = new TyrusClientAuthService.ClientAuthServiceClient();
                partyID = tyrusClientService.AuthenticateUser(clientUN, clientPW, browser, webApplicationL, false, ref clientName, ref lockoutTimeRemaining, ref isActve, ref isValidated, ref emailAddress, ref staffID);
                if (partyID != Guid.Empty && isActve)
                {
                    usrModel.PartyID = partyID.ToString();
                    usrModel.EmailAddress = emailAddress;
                    usrModel.isLoggedIn = true;
                    usrModel.ResultMessage = "Success";
                    usrModel.ResultAdvancedMessage = partyID.ToString();

                    ClientAuthServiceClient ClientAuthService = new ClientAuthServiceClient();
                    clientName = ClientAuthService.GetClientName(partyID, 7);

                    usrModel.ClientName = clientName;


                }
                else
                {
                    if (lockoutTimeRemaining == 0)
                    {

                        usrModel.ResultMessage = "The username and password combination that you entered is incorrect. Should you experience any problems during this process, please contact the Citadel call centre for assistance on 086 110 0628 or send an email to <a style='font-family:Georgia' href='mailto:support@citadel.co.za?subject=Request for My Secure Zone username and password'>support@citadel.co.za</a>. The Citadel call centre is available from 7am until 7pm on weekdays.";
                        //ModelState.AddModelError("Password", "The username and password combination that you entered is incorrect. Should you experience any problems during this process, please contact the Citadel call centre for assistance on 086 110 0628 or send an email to <a style='font-family:Georgia' href='mailto:support@citadel.co.za?subject=Request for My Secure Zone username and password'>support@citadel.co.za</a>. The Citadel call centre is available from 7am until 7pm on weekdays.");
                    }
                    else
                    {
                        usrModel.ResultMessage = "Your account has been locked for the next " + lockoutTimeRemaining + " minutes. Please contact the Citadel call centre for assistance on 086 110 0628 or send an email to <a style='font-family:Georgia' href='mailto:support@citadel.co.za?subject=Request for My Secure Zone username and password'>support@citadel.co.za</a>. The Citadel call centre is available from 7am until 7pm on weekdays.";

                        //ModelState.AddModelError("Password", "Your account has been locked for the next " + lockoutTimeRemaining + " minutes. Please contact the Citadel call centre for assistance on 086 110 0628 or send an email to <a style='font-family:Georgia' href='mailto:support@citadel.co.za?subject=Request for My Secure Zone username and password'>support@citadel.co.za</a>. The Citadel call centre is available from 7am until 7pm on weekdays.");
                    }
                }

            }
            catch (Exception ex)
            {
                usrModel.ResultMessage = "UnSuccesful - ";
                usrModel.ResultAdvancedMessage = ex.Message;
            }


            return usrModel;
        }

        [HttpGet]
        public bool ChangePassword(string clientID, string newPassword)
        {
            ClientAuthServiceClient tyrusClientService = new ClientAuthServiceClient();
            bool success = tyrusClientService.ChangePassword(new Guid(clientID), newPassword, null);

            return success;
        }



        public string GetHtmlPart(string htmlPartKey)
        {
            CommonFactory commFactory = new CommonFactory();
            return commFactory.getHtmlPart(htmlPartKey);
        }


        // GET: Core
        public List<dynamic> GetMenuItems(Guid partyID, string siteColID, Boolean useAdmin, int currentUserID)
        {
            #region WebUserMenu
            WebComponent[] webComponents = null;
            ClientAuthServiceClient tyrusClientService = new ClientAuthServiceClient();
            webComponents = tyrusClientService.GetActiveWebcomponents(partyID, 1, false);

            #endregion

            List<dynamic> menuItems = new List<dynamic>();

            if (webComponents != null)
            {
                foreach (WebComponent component in webComponents)
                {
                    //if (component.IsMenuItem)
                    //{
                    menuItems.Add(component);
                    //}
                }
            }

            return menuItems.ToList();
        }


        public DataTable GetAdvisorData(Guid clientID)
        {
            TyrusClientService.ClientServiceClient clientService = new TyrusClientService.ClientServiceClient();

            DataSet data = clientService.GetEntitySharingSummary(clientID, false);

            DataSet dataSet = new DataSet();
            dataSet = data.Clone();
            DataRow advisorRow = dataSet.Tables[0].NewRow(); ;

            foreach (DataRow row in data.Tables[0].Rows)
            {
                if (Convert.ToBoolean(row["PrimaryContact"].ToString()) == true)
                {

                    advisorRow["Sharewith"] = row["Sharewith"];
                    advisorRow["PrimaryContact"] = row["PrimaryContact"];
                    advisorRow["ID"] = row["ID"];

                    dataSet.Tables[0].Rows.Add(advisorRow);

                    break;
                }
            }

            return dataSet.Tables[0];
        }


        private void proxyClient(HttpClientHandler request)
        {
            string useProxy = System.Configuration.ConfigurationManager.AppSettings["useProxy"];
            if (useProxy == "true")
            {
                request.Credentials = new NetworkCredential("devbuilder", "@cc3ss D3n13d123", "citadel");
                request.Proxy = new WebProxy("http://srv0864ffspt:8080", false);
                request.Proxy.Credentials = new NetworkCredential("devbuilder", "@cc3ss D3n13d123", "citadel");
                request.UseProxy = true;
            }
        }


        public dynamic GetAdvisorObj(int sid)
        {
            //string peopleApiStr = "[{ 'Id':2734,'Name':'ABRAHAM VAN DER WESTHUYSEN','JobTitle':'ADVISORY PARTNER','Qualifications':'BCOM ACCOUNTING','NameSuffix':'CFP�','Email':'abrahamvdw@citadel.co.za','Telephone':'+27 21 670 9103 ','PDFBiography':null,'Biography':'\u003cp\u003e\u003cspan\u003eI have a passion for people and providing them with objective advice regarding the wealth they have worked so hard to create. Before joining Citadel many years ago, I started my career at First National Bank. I enjoy good food and wine and being active, preferably somewhere on a river or the ocean or taking a walk down rolling green pastures and knocking a tiny little white ball around.\u003c/span\u003e\u003c/p\u003e','ProfilePicture':'/media/1842/abraham_van-der_westhuysen.png','CommentsOn':'','ExternalId':155,'Assistants':[{ 'Id':254,'Name':'Jan van Riebeeck','Email':'janvriebeeck@citadel.co.za','Telephone':'+27 21 670 9109 '},{ 'Id':245,'Name':'Koos Kombuis','Email':'koosK@citadel.co.za','Telephone':'+27 21 670 9104 '}]},{'Id':2735,'Name':'Piet VAN DER WESTHUYSEN','JobTitle':'ADVISORY PARTNER','Qualifications':'BCOM ACCOUNTING','NameSuffix':'CFP�','Email':'abrahamvdw@citadel.co.za','Telephone':'+27 21 670 9103 ','PDFBiography':null,'Biography':'\u003cp\u003e\u003cspan\u003eI have a passion for people and providing them with objective advice regarding the wealth they have worked so hard to create. Before joining Citadel many years ago, I started my career at First National Bank. I enjoy good food and wine and being active, preferably somewhere on a river or the ocean or taking a walk down rolling green pastures and knocking a tiny little white ball around.\u003c/span\u003e\u003c/p\u003e','ProfilePicture':'/media/1842/abraham_van-der_westhuysen.png','CommentsOn':'','ExternalId':312,'Assistants':[]}]";
            try
            {
                HttpClientHandler handler = new HttpClientHandler();
                proxyClient(handler);

                string uri = System.Configuration.ConfigurationManager.AppSettings["FireAgencyAdvisorApi"];
                uri += sid.ToString();

                using (HttpClient httpClient = new HttpClient(handler))
                {
                    httpClient.DefaultRequestHeaders.Accept.Add(
                          new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

                    Task<String> response = httpClient.GetStringAsync(uri);
                    return response.Result;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public dynamic GetClientDetails(string ClientID)
        {
            TyrusClientService.ClientServiceClient clientService = new TyrusClientService.ClientServiceClient();

            TyrusClientService.Client clientCore = clientService.GetClient(new Guid(ClientID), 1100);

            TyrusClientService.Individual individual = null;
            TyrusClientService.NonIndividual nonIndividual = null;

            if (clientCore.ClientType != 1)
            {
                nonIndividual = clientService.GetLegalEntityDetails(new Guid(ClientID), 1100);
            }
            else
            {
                individual = clientService.GetNaturalPersonDetails(new Guid(ClientID), 1100);
            }

            DataSet idData = clientService.GetClientIdentificationDetails(new Guid(ClientID), 1100);


            DataSet addressData = clientService.GetClientAddressDetails(new Guid(ClientID), 1100);

            ClientDetailModel personal = new Models.ClientDetailModel();
            personal.BirthCountry = individual != null ? individual.BirthCountry : nonIndividual.CountryOfResidence;
            personal.BirthDate = individual != null ? individual.BirthDate : nonIndividual.InceptionDate;
            personal.BirthPlace = individual != null ? individual.BirthPlace : "";
            personal.CountryOfResidence = individual != null ? individual.CountryOfResidence : nonIndividual.CountryOfResidence;
            personal.EmploymentStatus = individual != null ? individual.EmploymentStatus : (short)0;
            personal.FirstNames = individual != null ? individual.FirstNames : nonIndividual.RSATradeName;
            personal.Gender = individual != null ? individual.Gender : (short)1;
            personal.Initials = individual != null ? individual.Initials : "";
            personal.MarriageDate = individual != null ? individual.MaritalStatusDate : DateTime.MinValue;
            personal.Nationality = individual != null ? individual.Nationality : (short)0;
            personal.NickName = individual != null ? individual.NickName : "";
            personal.Suffix = individual != null ? individual.Suffix : "";
            personal.Surname = individual != null ? individual.Surname : nonIndividual.Surname;
            personal.Title = individual != null ? individual.Title : (short)0;
            personal.Salutation = "";
            personal.Email = "";
            personal.PostalAddress = "";
            personal.PhysicalAddress = "";
            personal.Diet = "";
            personal.Hobbies = "";
            personal.IDNumber = "";
            personal.Language = individual != null ? individual.CorrespondanceLanguage : nonIndividual.CorrespondanceLanguage;

            foreach (DataRow row in idData.Tables[0].Rows)
            {
                if (Convert.ToBoolean(row["IdentificationTypeDefault"]) == true)
                {
                    personal.IDNumber = row["IdentificationNumber"].ToString();
                    break;
                }
            }

            DataSet emailData = clientService.GetClientEmailDetails(new Guid(ClientID), 1100);

            foreach (DataRow row in emailData.Tables[0].Rows)
            {
                if (Convert.ToBoolean(row["EMailHere"]) == true)
                {
                    personal.Email = row["EMail"].ToString();
                    break;
                }
            }


            if (addressData != null && addressData.Tables.Count > 0 && addressData.Tables[0].Rows.Count > 0)
            {
                personal.PostalAddress = addressData.Tables[0].Rows[0]["CombinedPostal"].ToString();
                personal.PhysicalAddress = addressData.Tables[0].Rows[0]["CombinedResidential"].ToString();
            }


            return personal;


        }

        [HttpGet]
        public bool SentPersonalMail(string clientID, string jsonStr)
        {
            ClientAuthServiceClient clientService = new ClientAuthServiceClient();
            Guid partyID = new Guid(clientID);
            string clientFullName = clientService.GetClientName(partyID, 4);

            ClientDetailModel personal = (ClientDetailModel)JsonConvert.DeserializeObject(jsonStr, typeof(ClientDetailModel));

            List<FrameworkService.Lookup> lookupList = new List<FrameworkService.Lookup>();
            lookupList = GetLookup("lkpPartyTitle");
            string originaTitle = lookupList.Where(p => p.ID.Equals(personal.Title)).Select(p => p.Description).SingleOrDefault();

            lookupList = new List<FrameworkService.Lookup>();
            lookupList = GetLookup("lkpSharedLanguage");
            string originalLanguage = lookupList.Where(p => p.ID.Equals(personal.Language)).Select(p => p.Description).SingleOrDefault();

            string body = "<p>Client name: " + clientFullName + "</p><br /><p>Title:<br />" + originaTitle + "</p>";

            body = body + "<p>Nickname:<br />" + personal.NickName + "</p>";
            body = body + "<p>Name as per ID:<br />" + personal.FirstNames + "</p>";
            body = body + "<p>Surname:<br />" + personal.Surname + "</p>";
            body = body + "<p>Preferred language:<br />" + originalLanguage + "</p>";
            body = body + "<p>Postal address:<br />" + personal.PostalAddress + "</p>";
            body = body + "<p>Physical address:<br />" + personal.PhysicalAddress + "</p>";

            TyrusNotificationService.ClientNotificationServiceClient notificationService = new TyrusNotificationService.ClientNotificationServiceClient();

            bool result = false;

            result = notificationService.SendClientPortfolioUpdateRequest(partyID, body);
            return result;
        }


        public dynamic GetLookup(string tableName)
        {
            FrameworkService.FrameworkServiceClient framework = new FrameworkService.FrameworkServiceClient();

            DataSet titles = framework.GetLookupSpecific(tableName, "LID, Description", "Lang = 3", "Description");

            return BuildList(titles);
        }


        public dynamic GetReportCurrencies()
        {
            TyrusReportService.ReportServiceClient tyrusReportService = new TyrusReportService.ReportServiceClient();

            DataTable data = tyrusReportService.GetReportCurrencies();

            return data;
        }


        private List<FrameworkService.Lookup> BuildList(DataSet dataSet)
        {
            List<FrameworkService.Lookup> lookupList = new List<FrameworkService.Lookup>();
            FrameworkService.Lookup lookup = new FrameworkService.Lookup();

            foreach (DataRow row in dataSet.Tables[0].Rows)
            {
                lookup = new FrameworkService.Lookup();

                lookup.ID = Convert.ToInt16(row["LID"]);
                lookup.Description = row["Description"].ToString();
                lookup.Language = 3;

                lookupList.Add(lookup);
            }

            return lookupList;
        }

        [HttpGet]
        public ApiRequestResult SendPasswordResetEMail(string email)
        {
            ApiRequestResult apiResult = new ApiRequestResult();
            apiResult.Result = false;
            try
            {
                ClientAuthServiceClient tyrusClientService = new ClientAuthServiceClient();
                tyrusClientService.switchUser(1100);
                string error = "";
                apiResult.Result = tyrusClientService.ResetPassword(email, ref error);
                apiResult.ResultDescription1 = error;
            }
            catch (Exception ex)
            {
                apiResult.Result = false;
                apiResult.ResultDescription1 = "Unexpected error occured. Please contact Citadel call centre for assistance on " + ConfigurationManager.AppSettings["HelpdeskNumber"] + " or send an email to " + ConfigurationManager.AppSettings["HelpdeskEmail"] + ".";
                apiResult.ResultDescription2 = ex.Message;
            }


            return apiResult;
        }

        [HttpGet]
        public ApiRequestResult RegisterClient(string IDNumber, string EmailAddress, string CellPhone)
        {

            ApiRequestResult apiResult = new ApiRequestResult();
            apiResult.Result = false;
            try
            {
                ClientAuthServiceClient clientService = new ClientAuthServiceClient();

                string result = clientService.RegisterClient(IDNumber, EmailAddress, CellPhone, 1);

                if (String.IsNullOrEmpty(result))
                {
                    apiResult.Result = true;
                    apiResult.ResultDescription1 = "Registration failed";
                }
                else
                {
                    apiResult.Result = true;
                    apiResult.ResultDescription1 = result;
                }
            }
            catch (Exception ex)
            {

                apiResult.Result = true;
                apiResult.ResultDescription1 = "Unexpected error occured. Please contact Citadel call centre for assistance on " + ConfigurationManager.AppSettings["HelpdeskNumber"] + " or send an email to " + ConfigurationManager.AppSettings["HelpdeskEmail"] + ".";
                apiResult.ResultDescription2 = ex.Message;
            }

            return apiResult;
        }

        [HttpGet]
        public ApiRequestResult CreateOTP(string ClientID, short CategoryL, string CellNumber)
        {
            ApiRequestResult apiResult = new ApiRequestResult();
            apiResult.Result = false;
            try
            {
                string resultInfo = "";
                TyrusNotificationService.ClientNotificationServiceClient notificationServiceClient = new TyrusNotificationService.ClientNotificationServiceClient();
                notificationServiceClient.switchUser(1100);
                apiResult.Result = notificationServiceClient.CreateOTP(new Guid(ClientID), CategoryL, CellNumber, out resultInfo);
                apiResult.ResultDescription1 = resultInfo;

            }
            catch (Exception ex)
            {

                apiResult.Result = true;
                apiResult.ResultDescription1 = "Unexpected error occured. Please contact Citadel call centre for assistance on " + ConfigurationManager.AppSettings["HelpdeskNumber"] + " or send an email to " + ConfigurationManager.AppSettings["HelpdeskEmail"] + ".";
                apiResult.ResultDescription2 = ex.Message;
            }

            return apiResult;

        }

        [HttpGet]
        public ApiRequestResult CheckOTP(string ClientID, short CategoryL, string otp)
        {
            ApiRequestResult apiResult = new ApiRequestResult();
            apiResult.Result = false;
            try
            {
                string resultInfo = "";
                TyrusNotificationService.ClientNotificationServiceClient notificationServiceClient = new TyrusNotificationService.ClientNotificationServiceClient();
                apiResult.Result = notificationServiceClient.CheckOTP(new Guid(ClientID), CategoryL, otp, out resultInfo);
                apiResult.ResultDescription1 = resultInfo;
            }
            catch (Exception ex)
            {
                apiResult.Result = false;
                apiResult.ResultDescription1 = "Unexpected error occured. Please contact Citadel call centre for assistance on " + ConfigurationManager.AppSettings["HelpdeskNumber"] + " or send an email to " + ConfigurationManager.AppSettings["HelpdeskEmail"] + ".";
                apiResult.ResultDescription2 = ex.Message;
            }
   
            return apiResult;
        }

    }
}