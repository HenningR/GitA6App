export class LookupModel{
    ID:number;
    Description?:string;
    Language?:number;
}


export class ReportCurrencyLookupModel{
    LID:number;
    LIDDescription?:string;
    CurrencySymbol?:string;
    Abbreviation?:string;
    CountryL?:number;
    CountryLDescription?:string;
    IncludeInFeePerformanceReport?:boolean;
    IsDeleted?:Boolean;
    DataStreamAbbreviation?:string;
}