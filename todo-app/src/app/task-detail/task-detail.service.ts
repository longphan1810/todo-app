import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { taskDetailStore } from './task-detail.store';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskDetailService implements OnDestroy {
  private subcriber: any = [];
  private _store: taskDetailStore;
  private apiurl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {
    this._store = new taskDetailStore();
  }

  ngOnDestroy(): void {
    this.subcriber.forEach((sub: any) => {sub.unsubscribe();});
  }

  getData() {
    const getData = this.httpClient.get(this.apiurl).subscribe((data: any) => this._store._state.next(data));
    this.subcriber.push(getData);
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
