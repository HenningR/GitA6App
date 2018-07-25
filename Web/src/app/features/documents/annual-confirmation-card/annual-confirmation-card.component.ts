import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-annual-confirmation-card',
  templateUrl: './annual-confirmation-card.component.html',
  styleUrls: ['./annual-confirmation-card.component.scss']
})
export class AnnualConfirmationCardComponent implements OnInit {
  @Input() confirmationTable: any;

  constructor() { }

  ngOnInit() {

  }

  public getAnnuityDate(annDateStr: string) {
    let annDate: Date = new Date(annDateStr);

    if (annDate.getFullYear() > 1900) {
      return annDate.getFullYear().toString();
    } else {
      return '';
    }
  }


}
