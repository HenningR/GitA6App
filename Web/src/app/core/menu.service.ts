import { Injectable } from '@angular/core';
import { MenuParams } from './models/menu-params.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public menuList: MenuParams[] = [];
  public showMenu: boolean = false;
  public breadCrumb: string = "";
  public currentWebComponentL: number = 0;


  public reset() {
    this.menuList = [];
    this.showMenu = false;
    this.breadCrumb = "";
    this.currentWebComponentL = 0;
  }


  public getMenuList(): MenuParams[] {
    return this.menuList.filter(value => value.IsMenuItem == true && value.Level == 0);
  }

  public getMenuItem(currentWebComponentL): MenuParams {

    let menuItems: MenuParams[] = this.menuList.filter(value => value.WebComponentL == currentWebComponentL);
    if (menuItems.length > 0) {
      return menuItems[0];
    } else {
      return new MenuParams();
    }
  }


  public getSubMenuList(parentID: number, isMenuItem: boolean): MenuParams[] {
    return this.menuList.filter(value => value.ParentID == parentID && value.IsMenuItem == isMenuItem);
  }

  public hasSubElements(parentID: number, isMenuItem: boolean): boolean {
    return (this.getSubMenuList(parentID, isMenuItem).length > 0);
  }



  constructor() { }
}
