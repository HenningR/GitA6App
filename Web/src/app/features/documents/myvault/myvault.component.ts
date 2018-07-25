import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MenuService } from '../../../core/menu.service';

import { Routes, RouterModule, CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccountService } from '../../../core/account.service';
import { MenuParams } from '../../../core/models/menu-params.model';
import { DocumentService } from '../../../core/document.service';
import { DocumentModel } from '../../../core/models/documents.model';
import { InformationService } from '../../../core/information.service';



@Component({
  selector: 'app-myvault',
  templateUrl: './myvault.component.html',
  styleUrls: ['./myvault.component.scss']
})
export class MyvaultComponent implements OnInit {

  public documentCategories: MenuParams[] = [];
  public documentSubCategories: DocumentModel[] = [];
  public documentSpecificArr:DocumentModel[] = [];

  public alreadyLoaded: Boolean = false;
  public showDocuments: boolean = false;
  public showAnnualReport: boolean = false;
  public showDocumentCategories:boolean = true;


  constructor(private accountSV: AccountService, public menuServ: MenuService, public docServ: DocumentService, public sanitiser: DomSanitizer,private infoService: InformationService) { }

  ngOnInit() {
    this.closeDocumentView();
    this.alreadyLoaded = false;
    this.getDocumentCategories();

  }


  public openAccordion(webCategory: string) {
    this.documentSubCategories = [];

    if (webCategory == "Annual Report")
    {
      this.loadAnnualReport();
    }else
    {
      this.loadTyrusDoc(webCategory);
    }


  }

private loadAnnualReport(){
  this.showAnnualReport = true;
  this.showDocumentCategories = false;
}


private loadTyrusDoc(webCategory:string){
  if (this.docServ.documents.length == 0) {
    this.infoService.info("Busy loading.Please wait.");


    this.docServ.getDocuments(this.accountSV.client.PartyID, null, null).then((result) => {
      this.documentSubCategories = this.docServ.getDocumentByWebCategoryByDistinctCategory(webCategory);
      this.showDocuments = true;
      this.showDocumentCategories = false;
    });
  } else {
    this.documentSubCategories = this.docServ.getDocumentByWebCategoryByDistinctCategory(webCategory);
    this.showDocuments = true;
    this.showDocumentCategories = false;
  }
}



public openDocument(documentID:string,name:string)
{
  this.docServ.getDocumentData(documentID).then((result)=>{
      this.docServ.openPDFDocument(name);
  });
}


  public getDocumentClients(webCategory: string): DocumentModel[] {
    return this.docServ.getDocumentByWebCategoryByDistinctClient(webCategory);
  }


  public getDocumentSpecificCol(webCategory: string, partyID: string): DocumentModel[] {
    return this.docServ.getDocumentByWebCategoryByDistinctCategoryandClient(webCategory, partyID);
  }


  public showClient(partyID,webCategory):boolean{
    this.documentSpecificArr = [];
    this.documentSpecificArr = this.getDocumentSpecificCol(webCategory, partyID);
    return (this.documentSpecificArr.length > 0);
  }


  public getDocumentCategories() {
    if (this.alreadyLoaded == false && this.menuServ.currentWebComponentL != 0) {
      let webComponentL = this.menuServ.currentWebComponentL;
      this.documentCategories = this.menuServ.getSubMenuList(webComponentL, false);
    }
  }


  public closeDocumentView(){
    this.showDocuments = false;
    this.showAnnualReport = false;
    this.showDocumentCategories = true;
    this.documentSubCategories = [];
    this.documentSpecificArr = [];

  }



}


