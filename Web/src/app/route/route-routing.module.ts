import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppComponent } from '../app.component';
import {  LoginComponent } from '../features/account/login/login.component';
import { AccountService } from '../core/account.service';
import { MenuService } from '../core/menu.service'
 
import {
  HomeComponent, NotificationsComponent, MyvaultComponent
  , AdvisorComponent, IndicatorsComponent, TradingComponent
  , SecuremessagesComponent, ChangePasswordComponent, PersonalDetailsComponent
  , CitadelplatformComponent
  , OtherplatformComponent
  , AllplatformComponent
  , QuaterlyreportsComponent
  , ForgetpasswordComponent
  , RegisterComponent
} from '../features/features.module';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private accountService: AccountService, public menuServ: MenuService) { }

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (!this.accountService.clientLoggedIn) {
      this.router.navigate(['/login']);
      this.menuServ.breadCrumb = "";
      this.menuServ.currentWebComponentL = 0;


      return false;
      //} else if (this.userService.userInfo.IsExpired || this.userService.userInfo.IsTempPassword) {
      //    this.router.navigate(['/change-password'], { queryParams: { returnUrl: state.url, title: "Password expired" } });
      //   return false;
    } else {
      this.menuServ.breadCrumb = router.routeConfig.path;
      this.menuServ.currentWebComponentL = router.data["WebComponentL"];
      return true;
    }
  }
}
 
const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: {
      WebComponentL: 0
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      WebComponentL: 0
    }
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent,
    data: {
      WebComponentL: 1
    }
  },
  {
    path: 'notifications',
    canActivate: [AuthGuard],
    component: NotificationsComponent,
    data: {
      WebComponentL: 11
    }
  },
  {
    path: 'vault',
    canActivate: [AuthGuard],
    component: MyvaultComponent,
    data: {
      WebComponentL: 8
    }
  },
  {
    path: 'advisor',
    canActivate: [AuthGuard],
    component: AdvisorComponent,
    data: {
      WebComponentL: 14
    }
  },
  {
    path: 'secure message',
    canActivate: [AuthGuard],
    component: SecuremessagesComponent,
    data: {
      WebComponentL: 15
    }
  },
  {
    path: 'indicators',
    canActivate: [AuthGuard],
    component: IndicatorsComponent,
    data: {
      WebComponentL: 21
    }
  },
  {
    path: 'online trading',
    canActivate: [AuthGuard],
    component: TradingComponent,
    data: {
      WebComponentL: 22
    }


  },
  {
    path: 'change password',
    canActivate: [AuthGuard],
    component: ChangePasswordComponent,
    data: {
      WebComponentL: 6
    }
  },
  {
    path: 'personal details',
    canActivate: [AuthGuard],
    component: PersonalDetailsComponent,
    data: {
      WebComponentL: 19
    }
  },
  {
    path: 'citadel platforms',
    canActivate: [AuthGuard],
    component: CitadelplatformComponent,
    data: {
      WebComponentL: 16
    }
  },
  {
    path: 'other platforms',
    canActivate: [AuthGuard],
    component: OtherplatformComponent,
    data: {
      WebComponentL: 17
    },
  },
  {
    path: 'all platforms',
    canActivate: [AuthGuard],
    component: AllplatformComponent,
    data: {
      WebComponentL: 18
    }
  },
  {
    path: 'quarterly reports',
    canActivate: [AuthGuard],
    component: QuaterlyreportsComponent,
    data: {
      WebComponentL: 3
    }
  },
  {
    path: 'forgetpassword',
    component: ForgetpasswordComponent,
    data: {
      WebComponentL: -1
    }
  },
  {
    path: 'registerclient',
    component: RegisterComponent,
    data: {
      WebComponentL: -1
    }
  }

  
  
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class RouteRoutingModule { }
