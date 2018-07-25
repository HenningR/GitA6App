import { Component, OnInit, KeyValueChanges, KeyValueDiffer, KeyValueDiffers } from '@angular/core';
import { NgModule } from '@angular/core';
import { AccountService } from '../../core/account.service';
import { CoreService } from '../../core/core.service';
import { GlobalService } from '../../core/global.service';
import { InformationService } from '../../core/information.service';
import { ClientDetails } from '../../core/models/client.model';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {

  public userDiffer: KeyValueDiffer<string, any>;
  public user: ClientDetails = new ClientDetails();
  constructor(public accountServ: AccountService, public coreServ: CoreService, public globalServ: GlobalService, public infoService: InformationService, public differs: KeyValueDiffers) { }

  ngOnInit() {

    let lkpLanguageLoaded: boolean = false;
    let lkpTitleLoaded: boolean = false;
    if (this.globalServ.lkpSharedLanguages.length > 0) {
      lkpLanguageLoaded = true;
    }
    if (this.globalServ.lkpPartyTitles.length > 0) {
      lkpTitleLoaded = true;
    }


    this.coreServ.GetLookup("lkpSharedLanguage", lkpLanguageLoaded).then((result) => {
      if (lkpLanguageLoaded == false) {
        this.globalServ.lkpSharedLanguages = result;
      }
      this.coreServ.GetLookup("lkpPartyTitle", lkpTitleLoaded).then((result) => {
        if (lkpTitleLoaded == false) {
          this.globalServ.lkpPartyTitles = result;

        }
        this.accountServ.GetClientDetails(this.accountServ.client.PartyID).then((result) => {
          this.user = this.accountServ.clientDetails;
          this.userDiffer = this.differs.find(this.user).create();
          const changes = this.userDiffer.diff(this.user); //need to call the firsttime to update previous values
        });
      });
    });

  }

  customerChanged(changes: KeyValueChanges<string, any>) {
    console.log('changes');
    changes.forEachChangedItem((record) => {
      alert(record.key);
    });
  }

  UpdatePersonalDetail() {

    const changes = this.userDiffer.diff(this.user);
    if (changes) {
      //this.customerChanged(changes);
      this.accountServ.SendClientDetails(this.accountServ.client.PartyID, this.user).then((result) => {
        this.infoService.success("Personal detail updated successfully.");
        setTimeout(() => {
          let elementList = document.querySelectorAll('.topScrollPos');
          let element = elementList[0] as HTMLElement;
          element.scrollIntoView({ behavior: 'smooth' });
        }, 1000);
      });
    }
  }

}
