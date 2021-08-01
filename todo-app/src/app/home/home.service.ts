import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { homeStore } from './home.store';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService implements OnDestroy {
  private subcriber: any = [];
  private _store: homeStore;
  private apiurl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {
    this._store = new homeStore();
  }

  ngOnDestroy(): void {
    this.subcriber.forEach((sub: any) => {sub.unsubscribe();});
  }

  getData() {
    const getData = this.httpClient.get(this.apiurl).subscribe((data: any) => this._store._state.next(data));
    this.subcriber.push(getData);
  }

  move(data: any) {
    const move = this.httpClient.put(this.apiurl, data).subscribe((data) => console.log(data));
    this.subcriber.push(move);
  }

  deleteData(data: any) {
    const deleted = this.httpClient.delete(`${this.apiurl}/${data.id}`, data).subscribe((data) => console.log(data));
    this.subcriber.push(deleted);
  }

  get state$() {
    return this._store.getState$();
  }

  get state() {
    return this._store.getState();
  }
}
