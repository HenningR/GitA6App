import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Router, ActivatedRoute, Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MenuParams } from '../../core/models/menu-params.model';
import { MenuService } from '../../core/menu.service'
import { AccountService } from '../../core/account.service'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Output() change: EventEmitter<string> = new EventEmitter<string>();

  constructor(public menuServ: MenuService, public accountSV: AccountService, private router: Router) {
  }

  ngOnInit() {
  }

  changeRoute(routeDesc,breadCrumbDesc) {
    let tempStr: string = "";
    tempStr = routeDesc;
    this.change.emit(tempStr.toLowerCase().trim());
  }

  public logOut() {
    this.accountSV.logOutClient().then((result) => {
      if (result) {
        this.menuServ.breadCrumb = "";
        this.router.navigate(['/']);
      }
    });
  }

}
