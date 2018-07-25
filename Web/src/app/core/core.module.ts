import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import {ApiService} from './api.service';
import {AccountService} from './account.service';
import {InformationService} from './information.service';
import {MenuService} from './menu.service';
import {CoreService} from './core.service';
import {GlobalService} from './global.service';
import {ClientnotificationService} from './clientnotification.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    ApiService
    ,GlobalService
    ,AccountService
    ,InformationService
    ,MenuService
    ,CoreService
    ,ClientnotificationService
  ]
})
export class CoreModule { }

export {
  ApiService
  ,GlobalService
  ,AccountService
  ,InformationService
  ,MenuService
  ,CoreService
  ,ClientnotificationService
}
