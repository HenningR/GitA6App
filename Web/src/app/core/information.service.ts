import { Injectable, NgZone } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable({
  providedIn: 'root'
})
export class InformationService {

  private subject: Subject<any> = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor (private router: Router, private ngz: NgZone) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          this.keepAfterNavigationChange = false;
        } else {
          this.subject.next();
        }
      }
    });
  }

  success(message: string, keepAfterNavigationChange: boolean = false) {
    this.ngz.run(() => {
      this.keepAfterNavigationChange = keepAfterNavigationChange;
      this.subject.next({ type: 'success', text: message });
    });
  }
  info(message: string, keepAfterNavigationChange: boolean = false) {
    this.ngz.run(() => {
      this.keepAfterNavigationChange = keepAfterNavigationChange;
      this.subject.next({ type: 'info', text: message });
    });
  }
  warning(message: string, keepAfterNavigationChange: boolean = false) {
    this.ngz.run(() => {
      this.keepAfterNavigationChange = keepAfterNavigationChange;
      this.subject.next({ type: 'warning', text: message });
    });
  }
  error(message: string, keepAfterNavigationChange: boolean = false) {
    this.ngz.run(() => {
      console.error(message);
      this.keepAfterNavigationChange = keepAfterNavigationChange;
      this.subject.next({ type: 'error', text: message });
    });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
