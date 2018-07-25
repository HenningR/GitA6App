import { Component } from '@angular/core';
import { Router, ActivatedRoute, Routes, RouterModule } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgModule } from '@angular/core';
import { AccountService } from '../app/core/account.service';
import { MenuParams } from './core/models/menu-params.model';
import { MenuService } from './core/menu.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  // animations: [
  //   trigger('slideInOut', [
  //     state('in', style({
  //       transform: 'translate3d(0, 0, 0)'
  //     })),
  //     state('out', style({
  //       transform: 'translate3d(100%, 0, 0)'
  //     })),
  //     transition('in => out', animate('400ms ease-in-out')),
  //     transition('out => in', animate('400ms ease-in-out'))
  //   ]),
  // ]

})

export class AppComponent {
  title = 'app';
  //hideAppMenu: string = 'true';
  menuState: string = 'in';
  result: any;

  constructor(private router: Router, private route: ActivatedRoute, public accountSV: AccountService, public menuServ: MenuService) {

    if (accountSV.clientLoggedIn) {
      this.accountSV.MenuItems().then((result) => {
        this.menuServ.menuList = [];
        this.menuServ.menuList = result;
      });
    }
  }

  toggleMenu() {
    this.menuServ.showMenu = this.menuServ.showMenu === true ? false : true;
  }

  closeMenu() {
    this.menuServ.showMenu = false;
  }





  routeChange(event) {
    setTimeout(() => {
      this.router.navigate([event]);
      this.toggleMenu();
    }, 100);
  }
}
