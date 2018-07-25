import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { InformationService } from '../../core/core.module';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  message: any;
  constructor(private infoService: InformationService) { }
  clear(event: Event) {
    this.message = undefined;
  }
  ngOnInit() {
    this.infoService.getMessage().subscribe(message => {
      let that = this;
      this.message = message;
      setTimeout(() => {
       that.message = undefined;
      }, 5000);
    });
  }

}
