using MysecureZoneApp.Api.Models;
using MySecureZoneApp.Api.Models;
using MySecureZoneApp.Api.TyrusReportService;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MySecureZoneApp.Api.Controllers
{
    public class ReportingController : ApiController
    {

        private WebDocumentIndice[] GetDocumentMappings(Guid partyId, DateTime? dateFrom, DateTime? dateTo, Int16? marketingTypeID)
        {
            //Get the Documents from the Tyrus Db : DocumentWebMapping
            TyrusReportService.ReportServiceClient reportServ = new TyrusReportService.ReportServiceClient();
            WebDocumentIndice[] webDocMappingsArr = reportServ.getDocumentWebMappings(partyId, dateFrom, dateTo, marketingTypeID);
            return webDocMappingsArr;
        }

        [HttpGet]
        public List<DocumentModel> getDocuments(string partyID, DateTime? dateFrom, DateTime? dateTo, Int16? marketingTypeID)
        {

            List<DocumentModel> currentList = new List<DocumentModel>();
            try
            {

                //Build up Marketing Document Model to display on the view
                string MappingDesc = "";
                WebDocumentIndice[] documentWebMappings = new WebDocumentIndice[0];
                if (marketingTypeID > 0 || marketingTypeID == null)
                {
                    documentWebMappings = GetDocumentMappings(new Guid(partyID), dateFrom, dateTo, marketingTypeID);
                }


                DocumentModel clientDocument = new DocumentModel();

                foreach (WebDocumentIndice docMap in documentWebMappings)
                {

                    MappingDesc = docMap.WebCategoryDesc;

                    clientDocument = new DocumentModel(docMap.DocumentID, docMap.PartyID
                        , docMap.ClientSalutation
                        , docMap.ClassL, docMap.ClassLDescription
                        , docMap.CategoryL, docMap.CategoryLDescription, docMap.TypeL, docMap.TypeLDescription
                        , docMap.SubTypeL
                        , docMap.SubTypeLDescription, 0, "", 0, docMap.ScannedDate, docMap.DateEffective
                        , docMap.Comments
                        , docMap.WorkflowID, docMap.StampDate, 0, docMap.FileExtension, Guid.Empty, Guid.Empty, docMap.DocumentWebIndicesDesc, docMap.AccountNumber, docMap.ContractNumber, MappingDesc);

                    currentList.Add(clientDocument);

                }


            }
            catch (Exception ex)
            {
                throw ex;
            }

            return currentList;
        }


        public byte[] GetDocumentData(string documentID)
        {
            byte[] byteArray = null;
            try
            {
                ReportServiceClient reportService = new ReportServiceClient();

                byteArray = reportService.getDocumentData(new Guid(documentID));
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return byteArray;
        }


        public DataSet GetActiveInvestmentAccounts(string clientID, bool externalSupplierOnly)
        {
            TyrusAccountService.AccountServiceClient tyrusAccountService = new TyrusAccountService.AccountServiceClient();

            DataSet data = tyrusAccountService.GetActiveAccounts(new Guid(clientID), externalSupplierOnly);

            return data;
        }


        public dynamic getValuationSummary(int valuationType, string clientID, string accountID, string dateEffectiveStr, short currencyL, bool includeManagedOnly,
                    bool includeRelated, bool includeShares, bool externalSupplierOnly)
        {
            dynamic result = null;
            ReportServiceClient tyrusReportService = new ReportServiceClient();

            DateTime dateEffective = new DateTime();
            DateTime.TryParse(dateEffectiveStr, out dateEffective);


            if (valuationType == 1)
            {
                result = tyrusReportService.ValutationSummaryHTML(new Guid(clientID), new Guid(accountID), dateEffective, currencyL, includeManagedOnly,
                    includeRelated, includeShares, externalSupplierOnly);
            }
            else if (valuationType == 2)
            {
                result = tyrusReportService.ValutationSummaryExcel(new Guid(clientID), new Guid(accountID), dateEffective, currencyL, includeManagedOnly, includeRelated, includeShares, externalSupplierOnly);
            }
            else if (valuationType == 3)
            {
                result = tyrusReportService.ValutationSummaryPdf(new Guid(clientID), new Guid(accountID), dateEffective, currencyL, includeManagedOnly, includeRelated, includeShares, externalSupplierOnly, true);
            }
            else if (valuationType == 4)
            {
                result = tyrusReportService.ValutationSummaryMailPDF(new Guid(clientID), new Guid(accountID), dateEffective, currencyL, includeManagedOnly, includeRelated, includeShares, externalSupplierOnly);
            }

            return result;
        }

        public dynamic getLastQuaterlyReports(string accountID)
        {

            DataTable data = new DataTable();

            if (accountID != null)
            {
                if (CheckLastQuarterlyReportNewFormat(new Guid(accountID)))
                {
                    data = GetLast4QuarterlyReports(new Guid(accountID));
                }
            }
            return data;
        }

        public dynamic getQuaterlyReportDoc(string accID, string startDateStr, string endDateStr, bool isAccount)
        {
            byte[] result = null;
            ReportServiceClient tyrusReportService = new ReportServiceClient();

            DateTime startDate = new DateTime();
            DateTime.TryParse(startDateStr, out startDate);
            DateTime endDate = new DateTime();
            DateTime.TryParse(endDateStr, out endDate);

            result = tyrusReportService.GenerateQuarterlyReport(new Guid(accID), startDate, endDate, isAccount, false);
            return result;
        }



        private bool CheckLastQuarterlyReportNewFormat(Guid accountID)
        {
            TyrusAccountService.AccountServiceClient accountService = new TyrusAccountService.AccountServiceClient();
            return accountService.CheckLastQuarterlyReportNewFormat(accountID);
        }

        private DataTable GetLast4QuarterlyReports(Guid accountID)
        {
            TyrusAccountService.AccountServiceClient accountService = new TyrusAccountService.AccountServiceClient();
            DataTable data = accountService.GetLast4Fees(accountID);
            return data;
        }



        public DataSet getPartyWebReports(string clientID, short reportTypeL)
        {
            bool bResult = false;
            DataSet reportDS = new DataSet();
            try
            {
                ReportServiceClient reportService = new ReportServiceClient();
                bResult = reportService.getWebReports(new Guid(clientID), reportTypeL, out reportDS);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return reportDS;
        }

        [HttpGet]
        public DataSet getAnnualWebReport(string clientID, string accountID, string dateEffectiveStr)
        {
            bool bResult = false;
            DataSet reportDS = new DataSet();
            string resultText = "";
            try
            {
                DateTime dateEffective = new DateTime();
                DateTime.TryParse(dateEffectiveStr, out dateEffective);

                ReportServiceClient reportService = new ReportServiceClient();

                bResult = reportService.getWebReportData(1, new Guid(clientID), new Guid(accountID), dateEffective, out reportDS, out resultText);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return reportDS;
        }


        public bool updateWebReport(string partyWebReportID, int updateType, short reportStatusL = 0, bool isConfirmed = false, bool isUpdated = false)
        {
            bool bResult = false;

            try
            {
                ReportServiceClient reportService = new ReportServiceClient();
                bResult = reportService.updateWebReport(new Guid(partyWebReportID), updateType, reportStatusL, isConfirmed, isUpdated);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return bResult;
        }


        public dynamic GetProductStatement(int productID, string accountID, string dateEffectiveStr)
        {
            ReportServiceClient tyrusReportService = new ReportServiceClient();
            string documentName = "";
            string errorMessage = "";
            byte[] StatementSheet = null;
            DocumentByteModel docModel = new DocumentByteModel();
            try
            {
                DateTime DateEffective = new DateTime();
                DateTime.TryParse(dateEffectiveStr, out DateEffective);

                StatementSheet = tyrusReportService.getProductSheet(productID, DateEffective, out documentName);
                docModel.DocumentData = StatementSheet;
                docModel.DocumentName = documentName;
                docModel.Result = true;
                if (StatementSheet == null && StatementSheet.Length <= 0)
                {

                    string errorFile = "An unexpected error occured.\nThe file you requested could not be retrieved.\nPlease contact the Citadel call centre for further assistance.\n\nError Description:\n";
                    errorFile = errorFile + errorMessage + "\n";
                    errorFile = errorFile + "identifier:" + accountID + "\n";
                    errorFile = errorFile + "effective:" + dateEffectiveStr + "\n";
                    errorFile = errorFile + "typeid:" + productID + "\n";

                    docModel.Result = false;
                    docModel.ResultDescription = errorFile;
                }

            }
            catch (Exception ex)
            {
                errorMessage = ex.Message;
                docModel.Result = false;
                docModel.ResultDescription = errorMessage;
            }

            return docModel;

        }

        [HttpGet]
        public dynamic FundFactSheet(int fundID, string productName)
        {

            ReportServiceClient tyrusReportService = new ReportServiceClient();
            string errorMessage = "";
            byte[] fundFactSheet = null;
            DocumentByteModel docModel = new DocumentByteModel();
            try
            {
                fundFactSheet = tyrusReportService.FundFactSheet(fundID);
                docModel.DocumentData = fundFactSheet;
                docModel.DocumentName = productName;
                docModel.Result = true;

                if (fundFactSheet == null && fundFactSheet.Length <= 0)
                {

                    string errorFile = "An unexpected error occured.\nThe file you requested could not be retrieved.\nPlease contact the Citadel call centre for further assistance.\n\nError Description:\n";
                    errorFile = errorFile + errorMessage + "\n";
                    errorFile = errorFile + "identifier:" + fundID + "\n";
                    errorFile = errorFile + "identifier description:" + productName + "\n";

                    docModel.Result = false;
                    docModel.ResultDescription = errorFile;
                }


            }
            catch (Exception ex)
            {
                errorMessage = ex.Message;
                docModel.Result = false;
                docModel.ResultDescription = errorMessage;
            }
            return docModel;
        }


        public dynamic GetSupplierStatement(string investmentID, string contractNumber, string dateFrom, string dateTo, string accountID, string effectiveDate, int productID)
        {
            ReportServiceClient tyrusReportService = new ReportServiceClient();
            byte[] StatementSheet = null;
            string ResultText = "";
            bool bResult = false;
            DocumentByteModel docModel = new DocumentByteModel();

            try
            {
                DateTime DateFrom = new DateTime();
                DateTime.TryParse(dateFrom, out DateFrom);

                DateTime DateTo = new DateTime();
                DateTime.TryParse(dateTo, out DateTo);

                bResult = tyrusReportService.getSupplierStatement(new Guid(investmentID), contractNumber, DateFrom, DateTo, productID, out StatementSheet, out ResultText);
                docModel.DocumentData = StatementSheet;
                docModel.DocumentName = contractNumber;
                docModel.Result = bResult;
                docModel.ResultDescription = ResultText;
            }
            catch (Exception ex)
            {
                ResultText = ResultText + "\n" + ex.Message;
                docModel.Result = false;
                docModel.ResultDescription = ResultText;
            }

            return docModel;

        }

        [HttpGet]
        public List<dynamic> GetEACReport(string partyWebReportID)
        {
            List<dynamic> list = new List<dynamic>();

            ReportServiceClient tyrusReportService = new ReportServiceClient();
            string resultText = "";
            DataSet eacDS = new DataSet();
            try
            {
                bool eacReportDataResult = tyrusReportService.GetEACReport(new Guid(partyWebReportID), out eacDS, out resultText);

                foreach (DataTable table in eacDS.Tables)
                {
                    list.Add(table);
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }

            return list;
        }


        [HttpGet]
        public List<dynamic> GetFeeSummaryReport(string partyWebReportID)
        {
            List<dynamic> list = new List<dynamic>();

            ReportServiceClient tyrusReportService = new ReportServiceClient();
            string resultText = "";
            DataSet feeSummaryDS = new DataSet();
            DataSet feeSummaryHeaderDS = new DataSet();
            
            try
            {
                bool eacReportDataResult = tyrusReportService.GetFeeSummaryReport(new Guid(partyWebReportID), out feeSummaryDS, out feeSummaryHeaderDS, out resultText);

                foreach (DataTable table in feeSummaryHeaderDS.Tables)
                {
                    list.Add(table);
                }

                foreach (DataTable table in feeSummaryDS.Tables)
                {
                    list.Add(table);
                }

                foreach (DataTable table in feeSummaryDS.Tables)
                {
                    list.Add(table.TableName);
                }


            }
            catch (Exception ex)
            {

                throw ex;
            }

            return list;
        }

    }
}
