import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { taskDetailStore } from './task-detail.store';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { stateInterface, taskInterface } from '../home/home.store';

@Injectable({
  providedIn: 'root'
})

export class TaskDetailService implements OnDestroy {
  public subscriber: Subscription[] = [];
  public store = new taskDetailStore();
  private apiUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  ngOnDestroy(): void {
    this.subscriber.forEach((sub) => {sub.unsubscribe();});
  }

  getData() {
    const getData = this.httpClient.get(this.apiUrl).subscribe((data: any) => this.store.pushNext(data));
    this.subscriber.push(getData);
  }

  deleteData(data: taskInterface) {
    const deleted = this.httpClient.delete(`${this.apiUrl}/${data.id}`).subscribe((data) => console.log(data));
    this.subscriber.push(deleted);
  }

  get state$(): Observable<stateInterface> {
    return this.store.getState$();
  }

  get state(): stateInterface {
    return this.store.getState();
  }
}
