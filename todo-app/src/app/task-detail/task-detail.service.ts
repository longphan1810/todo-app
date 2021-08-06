import { Injectable, OnDestroy } from '@angular/core';
import { TaskDetailStore } from './task-detail.store';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { ListTask, TaskForm } from '../home/home.store';

@Injectable({
  providedIn: 'root'
})

export class TaskDetailService implements OnDestroy {
  public subscriber: Subscription[] = [];
  public store = new TaskDetailStore();
  private apiUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  ngOnDestroy(): void {
    this.subscriber.forEach((sub) => {sub.unsubscribe();});
  }

  getData() {
    this.httpClient.get(this.apiUrl).subscribe((data: any) => this.store.pushNext(data));
  }

  deleteData(data: TaskForm) {
    this.httpClient.delete(`${this.apiUrl}/${data.id}`).subscribe((data) => console.log(data));
  }

  get state$(): Observable<ListTask> {
    return this.store.getState$();
  }

  get state(): ListTask {
    return this.store.getState();
  }
}
