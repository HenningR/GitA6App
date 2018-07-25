import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CoreService } from '../../core/core.service';
import { DomSanitizer } from '@angular/platform-browser';
import { InformationService } from '../../core/information.service';

@Component({
  selector: 'app-advisor',
  templateUrl: './advisor.component.html',
  styleUrls: ['./advisor.component.scss']
})
export class AdvisorComponent implements OnInit {

  public jsonObject: any;

  constructor(public coreServ: CoreService, public sanitiser: DomSanitizer,private infoService: InformationService) { }

  ngOnInit() {
    
    this.coreServ.getAdvisor().then((result) => {
      this.coreServ.getAdvisorObj().then((r) => {
        this.jsonObject = JSON.parse(this.coreServ.advisorObj)
      });
    });
  }

  public getSafeHTML(htmlStr: string): string {
    let sanHTML;
    sanHTML = this.sanitiser.bypassSecurityTrustHtml(htmlStr);
    return sanHTML;
  }

  public callControllerMethod(activityName: string) {
    alert("still need to add it to the activity log - " + activityName);
  }

  public buildText(textStr: string, objStr: string, activityName) {
    //callControllerMethod(activityName);
    return textStr + objStr;
  }

}
