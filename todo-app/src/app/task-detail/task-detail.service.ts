import { Injectable, OnDestroy } from '@angular/core';
import { taskDetailStore } from './task-detail.store';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { listTask, taskForm } from '../home/home.store';

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
    this.httpClient.get(this.apiUrl).subscribe((data: any) => this.store.pushNext(data));
  }

  deleteData(data: taskForm) {
    this.httpClient.delete(`${this.apiUrl}/${data.id}`).subscribe((data) => console.log(data));
  }

  get state$(): Observable<listTask> {
    return this.store.getState$();
  }

  get state(): listTask {
    return this.store.getState();
  }
}
