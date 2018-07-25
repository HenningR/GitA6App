import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CoreModule } from './core/core.module';

import { RouteRoutingModule } from './route/route-routing.module';
import { AppComponent } from './app.component';

import { MenuComponent } from './frame/menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FeaturesModule} from './features/features.module';
import { AccordionPanelComponent } from './shared/accordion-panel/accordion-panel.component';






@NgModule({
  declarations: [
    AppComponent
    ,MenuComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    CoreModule,
    FeaturesModule,
    RouteRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]


})
export class AppModule {}
