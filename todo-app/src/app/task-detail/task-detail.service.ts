import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { taskDetailStore } from './task-detail.store';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TaskDetailService implements OnDestroy {
  public subscriber: any = [];
  public _store = new taskDetailStore();
  private apiurl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {
  }

  ngOnDestroy(): void {
    this.subscriber.forEach((sub: any) => {sub.unsubscribe();});
  }

  initialize() {
    this._store = new taskDetailStore;
  }

  getData() {
    const getData = this.httpClient.get(this.apiurl).subscribe((data: any) => this._store.pushNext(data));
    this.subscriber.push(getData);
  }

  deleteData(data: any) {
    const deleted = this.httpClient.delete(`${this.apiurl}/${data.id}`, data).subscribe((data) => console.log(data));
    this.subscriber.push(deleted);
  }

  get state$() {
    return this._store.getState$();
  }

  get state() {
    return this._store.getState();
  }
}
