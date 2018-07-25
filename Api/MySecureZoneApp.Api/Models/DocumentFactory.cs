using System;
using System.Collections.Generic;
using System.Linq;

using MySecureZoneApp.Api.Models.EntityFramework;
using MySecureZoneApp.Api.TyrusReportService;

namespace MysecureZoneApp.Api.Models
{


    public class DocumentModel
    {
        public DocumentModel()
        {

        }
        public DocumentModel(Guid documentID, Guid partyID
            , string clientSalutation
            , short classL, string classLDescription
            , short categoryL, string categoryLDescription
            , short typeL, string typeLDescription
            , short subTypeL, string subTypeLDescription
            , short supplierL, string supplierLDescription
            , int scannedBy, DateTime scannedDate
            , DateTime dateEffective, String comments
            , String workflowID, DateTime stampDate
            , int stampStaffID, String fileExtension
            , Guid accountID, Guid investmentID
            , string documentWebIndicesDesc
            , Int64 accountNumber
            , string contractNumber
            ,string webCategoryDesc
            )
        {
            DocumentID = documentID;
            PartyID = partyID;
            ClientSalutation = clientSalutation;
            CategoryL = categoryL;
            CategoryLDescription = categoryLDescription;
            ClassL = classL;
            ClassLDescription = classLDescription;
            TypeL = typeL;
            TypeLDescription = typeLDescription;
            SubTypeL = subTypeL;
            SubTypeLDescription = subTypeLDescription;
            SupplierL = supplierL;
            SupplierLDescription = supplierLDescription;
            ScannedBy = scannedBy;
            ScannedDate = scannedDate;
            DateEffective = dateEffective;
            Comments = comments;
            WorkflowID = workflowID;
            StampDate = stampDate;
            StampStaffID = stampStaffID;
            FileExtension = fileExtension;
            AccountID = accountID;
            InvestmentID = investmentID;
            DocumentWebIndicesDescription = documentWebIndicesDesc;
            AccountNumber = accountNumber;
            ContractNumber = contractNumber;
            WebCategoryDesc = webCategoryDesc;
        }

        public string WebCategoryDesc { get; set; }
        public Guid DocumentID { get; set; }
        public Guid PartyID { get; set; }
        public string ClientSalutation { get; set; }
        public short ClassL { get; set; }
        public string ClassLDescription { get; set; }
        public short CategoryL { get; set; }
        public string CategoryLDescription { get; set; }
        public short TypeL { get; set; }
        public string TypeLDescription { get; set; }
        public short SubTypeL { get; set; }
        public string SubTypeLDescription { get; set; }
        public short SupplierL { get; set; }
        public string SupplierLDescription { get; set; }
        public int ScannedBy { get; set; }
        public DateTime ScannedDate { get; set; }
        public DateTime DateEffective { get; set; }
        public String Comments { get; set; }
        public String WorkflowID { get; set; }
        public DateTime StampDate { get; set; }
        public int StampStaffID { get; set; }
        public String FileExtension { get; set; }
        public Guid AccountID { get; set; }
        public Guid InvestmentID { get; set; }
        public string DocumentWebIndicesDescription { get; set; }
        public Int64 AccountNumber { get; set; }
        public String ContractNumber { get; set; }


    }

    public class DocumentMapCombined
    {
        public short ClassL { get; set; }
        public short CategoryL { get; set; }
        public short TypeL { get; set; }
        public short SubTypeL { get; set; }
        public DateTime StampDate { get; set; }
        public short MarketingTitleL { get; set; }
        public string MarketingDesc { get; set; }

    }

    public class DocumentFactory
    {
        private MySecureZone_Entities _dbContext;

        public DocumentFactory(MySecureZone_Entities db)
        {
            _dbContext = db;
        }

        public Dictionary<int, string> GetDocMarketingTypeModels(Guid partyId, Int16? marketingTypeID)
        {

            MySecureZoneApp.Api.TyrusReportService.ReportServiceClient reportServ = new MySecureZoneApp.Api.TyrusReportService.ReportServiceClient();
            WebDocumentIndice[] webDocMappingsArr = reportServ.getDocumentWebMappings(partyId, null, null, marketingTypeID);
            Dictionary<int, string> marketingTypes = new Dictionary<int, string>();


            marketingTypes.Add(0, "All");
            foreach (WebDocumentIndice indice in webDocMappingsArr)
            {
                if (!marketingTypes.ContainsKey(indice.WebCategoryL))
                {
                    marketingTypes.Add(indice.WebCategoryL, indice.WebCategoryDesc);
                }

            }



            return marketingTypes;
        }

        public WebDocumentIndice[] GetDocumentMappings(Guid partyId, DateTime? dateFrom, DateTime? dateTo, Int16 marketingTypeID)
        {
            //Get the Documents from the Tyrus Db : DocumentWebMapping
            MySecureZoneApp.Api.TyrusReportService.ReportServiceClient reportServ = new MySecureZoneApp.Api.TyrusReportService.ReportServiceClient();
            WebDocumentIndice[] webDocMappingsArr = reportServ.getDocumentWebMappings(partyId, dateFrom, dateTo, marketingTypeID);
            return webDocMappingsArr;
        }

    }



}