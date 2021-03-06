﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MySecureZoneApp.Api.TyrusAccountService {
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="TyrusAccountService.IAccountService")]
    public interface IAccountService {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IAccountService/GetLast4Fees", ReplyAction="http://tempuri.org/IAccountService/GetLast4FeesResponse")]
        System.Data.DataTable GetLast4Fees(System.Guid accountID);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IAccountService/GetLast4Fees", ReplyAction="http://tempuri.org/IAccountService/GetLast4FeesResponse")]
        System.Threading.Tasks.Task<System.Data.DataTable> GetLast4FeesAsync(System.Guid accountID);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IAccountService/GetActiveAccounts", ReplyAction="http://tempuri.org/IAccountService/GetActiveAccountsResponse")]
        System.Data.DataSet GetActiveAccounts(System.Guid partyID, System.Nullable<bool> externalSupplierOnly);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IAccountService/GetActiveAccounts", ReplyAction="http://tempuri.org/IAccountService/GetActiveAccountsResponse")]
        System.Threading.Tasks.Task<System.Data.DataSet> GetActiveAccountsAsync(System.Guid partyID, System.Nullable<bool> externalSupplierOnly);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IAccountService/CheckLastQuarterlyReportNewFormat", ReplyAction="http://tempuri.org/IAccountService/CheckLastQuarterlyReportNewFormatResponse")]
        bool CheckLastQuarterlyReportNewFormat(System.Guid accountID);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IAccountService/CheckLastQuarterlyReportNewFormat", ReplyAction="http://tempuri.org/IAccountService/CheckLastQuarterlyReportNewFormatResponse")]
        System.Threading.Tasks.Task<bool> CheckLastQuarterlyReportNewFormatAsync(System.Guid accountID);
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface IAccountServiceChannel : MySecureZoneApp.Api.TyrusAccountService.IAccountService, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class AccountServiceClient : System.ServiceModel.ClientBase<MySecureZoneApp.Api.TyrusAccountService.IAccountService>, MySecureZoneApp.Api.TyrusAccountService.IAccountService {
        
        public AccountServiceClient() {
        }
        
        public AccountServiceClient(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public AccountServiceClient(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public AccountServiceClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public AccountServiceClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        public System.Data.DataTable GetLast4Fees(System.Guid accountID) {
            return base.Channel.GetLast4Fees(accountID);
        }
        
        public System.Threading.Tasks.Task<System.Data.DataTable> GetLast4FeesAsync(System.Guid accountID) {
            return base.Channel.GetLast4FeesAsync(accountID);
        }
        
        public System.Data.DataSet GetActiveAccounts(System.Guid partyID, System.Nullable<bool> externalSupplierOnly) {
            return base.Channel.GetActiveAccounts(partyID, externalSupplierOnly);
        }
        
        public System.Threading.Tasks.Task<System.Data.DataSet> GetActiveAccountsAsync(System.Guid partyID, System.Nullable<bool> externalSupplierOnly) {
            return base.Channel.GetActiveAccountsAsync(partyID, externalSupplierOnly);
        }
        
        public bool CheckLastQuarterlyReportNewFormat(System.Guid accountID) {
            return base.Channel.CheckLastQuarterlyReportNewFormat(accountID);
        }
        
        public System.Threading.Tasks.Task<bool> CheckLastQuarterlyReportNewFormatAsync(System.Guid accountID) {
            return base.Channel.CheckLastQuarterlyReportNewFormatAsync(accountID);
        }
    }
}
