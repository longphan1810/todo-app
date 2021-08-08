import { Injectable, OnDestroy } from '@angular/core';
import { TaskDetailStore } from './task-detail.store';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { ListTask, TaskForm } from './task-detail.store';

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

  deleteData(url: string) {
    return this.httpClient.delete(url);
  }

  deleteAndReload(data: TaskForm) {
    if (!data.taskName) {
      return;
    }

    this.deleteData(`${this.apiUrl}/${data.id}`).subscribe((data) => {
      console.log(data);
      this.getData();
    });
  }

  get state$(): Observable<ListTask> {
    return this.store.getState$();
  }

  get state(): ListTask {
    return this.store.getState();
  }
}
