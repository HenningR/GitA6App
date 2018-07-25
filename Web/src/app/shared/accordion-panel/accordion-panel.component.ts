import { Component, OnInit, Input, Output, EventEmitter, Host } from '@angular/core';

//import { IAccordionEvents } from '../../models/accordion-events.model';
interface IAccordionEvents {
  notifySelected(child);
  notifyExpanded(child);
}

//import { ICitadelButton, CitadelButtonApi } from '../../models/citadel-button.model';

@Component({
  selector: 'app-accordion-panel',
  templateUrl: './accordion-panel.component.html',
  styleUrls: ['./accordion-panel.component.scss']
})
export class AccordionPanelComponent implements OnInit {

  @Input() data: any;
  @Input() flat = false;
  @Input() title = 'Untitled';
  @Input() additionaltitle = '';
  @Input() titleNoContent = 'No content';
  @Input() hasContent = true;
  @Input() subPanel = false;
  //@Input() actions: ICitadelButton[] = [];
  //@Input() actionsNoData: ICitadelButton[] = [];
  private events: IAccordionEvents = null;
  private _expanded = false;
  private _selected = false;
  @Output() expand = new EventEmitter<any>();
  @Output() collapse = new EventEmitter<any>();

  @Input() public get expanded() {
    return this._expanded && this.hasContent;
  }
  //public isVisible(button: ICitadelButton) {
 //   return CitadelButtonApi.isVisible(button, this.data);
 // }
 // public callAction(event, action: ICitadelButton) {
  //  action.action(event, this.data);
  //  event.stopPropagation();
  //}
  public attachEvents(events: IAccordionEvents) {
    this.events = events;
  }
  public set expanded(value) {
    this.setExpanded(value);
    if (this.events) {
      this.events.notifyExpanded(this);
    }
  }
  setExpanded(value) {
    this._expanded = value;
    if (value) {
      this.expand.emit(this.data);
    } else {
      this.collapse.emit(this.data);
    }
  }
  @Input() public get selected() {
    return this._selected;
  }
  public set selected(value) {
    this.setSelected(value);
    if (this.events) {
      this.events.notifySelected(this);
    }
  }
  public setSelected(value) {
    this._selected = value;
  }
  constructor() { }

  ngOnInit() {
  }

}






