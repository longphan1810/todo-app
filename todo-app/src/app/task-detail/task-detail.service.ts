import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { taskDetailStore } from './task-detail.store';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TaskDetailService implements OnDestroy {
  public subscriber: any = [];
  public store = new taskDetailStore();
  private apiUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  ngOnDestroy(): void {
    this.subscriber.forEach((sub: any) => {sub.unsubscribe();});
  }

  initialize() {
    this.store = new taskDetailStore;
  }

  getData() {
    const getData = this.httpClient.get(this.apiUrl).subscribe((data: any) => this.store.pushNext(data));
    this.subscriber.push(getData);
  }

  deleteData(data: any) {
    const deleted = this.httpClient.delete(`${this.apiUrl}/${data.id}`, data).subscribe((data) => console.log(data));
    this.subscriber.push(deleted);
  }

  get state$(): Observable<{taskName: null, taskDes: null}[]> {
    return this.store.getState$();
  }

  get state() {
    return this.store.getState();
  }
}
