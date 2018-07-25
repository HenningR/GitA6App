import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionPanelComponent } from './accordion-panel/accordion-panel.component';

@NgModule({
  imports: [
    CommonModule
  ],

  declarations: [AccordionPanelComponent],
  exports: [
    AccordionPanelComponent
  ]
})
export class SharedModule { }
