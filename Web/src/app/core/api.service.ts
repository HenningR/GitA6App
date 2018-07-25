import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response, Headers, RequestOptions } from '@angular/http';
import { map, take,filter, catchError, mergeMap,tap } from 'rxjs/operators';
import { Router, NavigationExtras } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import 'rxjs/add/observable/throw';
import { ApiParams } from './models/api-params.model';

import {InformationService} from './information.service'


@Injectable({
  providedIn: 'root'
})
export class ApiService {



  public setSignOutReason: (reason) => void = null;
  public get busy(): boolean {
    // console.info('Busy', 'check', this.processCount);
    return this.processCount > 0;
  }
  public isTestMode = false; // Used for AppStore testing
  private _busy = false;
  private processCount = 0;
  constructor (private http: Http, private router: Router,private notify: InformationService) { }

  public get(api: string, payload?: any): Observable<Response> {
    const options = new RequestOptions({
      withCredentials: true,
      headers: new Headers({ 'Content-Type': 'application/json' }),
      params: payload
    });
    this.processCount++;
    // console.info('Busy', 'inc', 'get', api, this.processCount);

    return this.http.get(this.buildUrl(api),options).pipe(tap(() => this._busy = false),map(data => this.extractData(data)));
    
    


    //return this.http.get(this.buildUrl(api), options).do(() => this._busy = false).map(r => this.extractData(r)).catch(e => this.handleError(e));
  }
  public load(api: string, payload?: any, params?: ApiParams): Subscription {
    if (!params) {
      params = {
        successMessage: null,
      }
    }
    let apiCall;
    if (params.inBody) {
      if (!params.successMessage) {
        params.successMessage = null;
      }
      apiCall = this.post(api, params.inBody ? undefined : payload, params.inBody ? payload : undefined);
    } else {
      apiCall = this.get(api, payload);
    }
    return apiCall.subscribe(
      data => {
        if (params.successMessage) {
          this.notify.success(params.successMessage);
        }
        if (params.success) {
          params.success(data);
        }
      },
      error => {
        if (params.failMessage !== null) {
          this.notify.error(params.failMessage || 'An error occurred while loading');
        }
        if (params.failure) {
          params.failure(error);
        }
      });
  }
  public loadMulti() { } //TODO: Create function that queues multiple functions
  public post(api: string, payload: any, payloadBody?: any): Observable<Response> {
    const options = new RequestOptions({
      headers: new Headers({ 'Content-Type': 'application/json' }),
      withCredentials: true,
      params: payload
    });
    // if (environment.isCordova) {
    //   options.headers.append('X-XSRF-TOKEN', this.cookies.get('XSRF-TOKEN'));
    // }

    this.processCount++;
    // console.info('Busy', 'inc', 'post', api, this.processCount);
    //return this.http.post(this.buildUrl(api), payloadBody || {}, options).map(r => this.extractData(r)).catch(e => this.handleError(e));

    //return this.http.post(this.buildUrl(api), payloadBody || {}, options).map(r => this.extractData(r)).catch(e => this.handleError(e));

    return this.http.get(this.buildUrl(api),options).pipe(map(data => this.extractData(data)));
  }
  public update(api: string, payload: any, params?: ApiParams): Subscription {
    if (!params) {
      params = {};
    }
    return this.post(api, params.inBody ? undefined : payload, params.inBody ? payload : undefined).subscribe(
      data => {
        if (params.successMessage !== null) {
          this.notify.success(params.successMessage || 'Successfully saved');
        }
        if (params.success) {
          params.success(data);
        }
      },
      error => {
        if (params.failMessage !== null) {
          this.notify.error(params.failMessage || 'An error occurred while saving');
        }
        if (params.failure) {
          params.failure(error);
        }
      });
  }
  public create(api: string, payload: any, params?: ApiParams): Subscription {
    if (payload.ID) {
      payload.ID = undefined;
    }
    return this.update(api, payload, params);
  }

  public download(base64: string, fileName: string, type = 'pdf') {
    if (!document) {
      return;
    }

    const arrBuffer = this.base64ToArrayBuffer(base64);
    const newBlob = new Blob([arrBuffer], { type: 'application/' + type });

    if (window.navigator && window.navigator.msSaveOrOpenBlob) { // Internet Explorer, oh dear
      window.navigator.msSaveOrOpenBlob(newBlob, fileName);
      return;
    }
    //if (environment.isCordova) {
    //  this.files.saveFile(fileName, newBlob);
    //  return;
    //}

    const data = window.URL.createObjectURL(newBlob);
    const link = document.createElement('a');
    link.style.display = 'none';
    document.body.appendChild(link); //required in FF, optional for Chrome
    link.href = data;
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(data);
    link.remove();
  }
  base64ToArrayBuffer(data) {
    const binaryString = window.atob(data);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };
  private buildUrl(controller: string): string {

    let baseURL = 'http://localhost:5200/api/';

    /* let baseURL = this.config.environment.apiUrl;
    if (this.isTestMode) {
      baseURL = 'https://clientinfoservice.citadel.co.za:8200/Staging/api/'; //TODO Remove hardcoding
    } */
    return baseURL + controller;
  }
  private convertDatesOnSingleObject(item) {
    const keys = Object.keys(item).filter(name => name.startsWith('Date') || name.endsWith('Date'));
    // console.info('convertDatesOnSingleObject', 'Start', keys);
    keys.forEach(key => {
      const value = item[key];
      const d = new Date(value);
      if (d && !isNaN(d.getTime())) {
        item[key] = d;
      }
    });
    // console.info('convertDatesOnSingleObject', 'End');
  }
  private convertDates(data) {
    if (Array.isArray(data)) {
      // console.info('convertDates', 'Start', data);
      (<any[]>data).forEach(item => this.convertDatesOnSingleObject(item));
      // console.info('convertDates', 'End');
    } else {
      this.convertDatesOnSingleObject(data);
    }
  }
  private extractData(res: Response) {
    this._busy = false;
    if (this.processCount > 0) {
      this.processCount--;
    }
    const body = res.json();
    if (body) {
      const finalData = body.data || body;
      this.convertDates(finalData);
      return finalData;
    } else {
      return {};
    }
  }
  private handleError(error: Response | any) {
    let body;
    this._busy = false;
    if (this.processCount > 0) {
      this.processCount--;
    }
    // console.info('Busy', 'dec', this.processCount, error);
    let errMsg: string;
    if (error instanceof Response) {
      if (error.status === 0) {
        //return Observable.throw('Network error');
       // return Observable.empty<Response>();
      }
      if (error.status === 401 && error.url.indexOf('/api/Auth/') === -1) { // Access token is not valid
        if (this.setSignOutReason) {
          this.setSignOutReason(error.statusText); // This is used, because the service cannot send routing parameters to a page.
        }
        this.router.navigate(['/login']);
       // return Observable.empty<Response>();
      }
      body = error['_body'] ? error.json() : { error: error.statusText };
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg, Response);
    if (body && body.ErrorMessages && body.ErrorMessages.length) {
     // return Observable.throw(body.ErrorMessages[0]);
     // return Observable.empty<Response>();
    } else {
      
      //return Observable.throw(error);
     // return Observable.empty<Response>();
    }
  }

  public clearProcessCount() {
    this.processCount = 0;
  }

}

export { Response, Observable, Subscription, Subject }
