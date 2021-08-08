import { Injectable, OnDestroy } from '@angular/core';
import { HomeStore } from './home.store';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { TaskForm, ListTask } from './home.store';

@Injectable({
  providedIn: 'root'
})
export class HomeService implements OnDestroy {
  public subscriber: Subscription[] = [];
  public store = new HomeStore();
  private apiUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  ngOnDestroy(): void {
    this.subscriber.forEach((sub: Subscription) => {sub.unsubscribe();});
  }

  postData(data: TaskForm) {
    return this.httpClient.post(this.apiUrl, data);
  }

  postAndReload(data: TaskForm) {
    this.postData(data)
    .subscribe((res) => {
      console.log(res);
      this.getData();
    });
  }

  getData() {
    this.httpClient.get(this.apiUrl).subscribe((data: any) => {this.store.pushNext(data);});
  }

  moveData(data: {task: TaskForm, nextTask: TaskForm}) {
    this.httpClient.put(this.apiUrl, data).subscribe((data) => {
      console.log(data);
    });
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

  moveTop(task: TaskForm) {
    if (!task.taskName) {
      return {taskName: '', taskDes: ''};
    }

    const ListTask: ListTask = this.state;
    this.moveData({task: task, nextTask: ListTask[0]});
    const taskName = task.taskName;
    const taskDes = task.taskDes;
    task.taskName = ListTask[0].taskName;
    task.taskDes = ListTask[0].taskDes;
    ListTask[0].taskName = taskName;
    ListTask[0].taskDes = taskDes;
    return ListTask[0];
  }

  moveDown(task: TaskForm) {
    if (!task.taskName) {
      return {taskName: '', taskDes: ''};
    }

    const ListTask: ListTask = this.state;
    const indexChange: number = ListTask.findIndex((item: TaskForm) => item.id === task.id);
    if (indexChange === this.state.length -1) {
      return {taskName: '', taskDes: ''};
    }

    this.moveData({task: task, nextTask: ListTask[indexChange+1]});
    const taskName = task.taskName;
    const taskDes = task.taskDes;
    task.taskName = ListTask[indexChange+1].taskName;
    task.taskDes = ListTask[indexChange+1].taskDes;
    ListTask[indexChange+1].taskName = taskName;
    ListTask[indexChange+1].taskDes = taskDes;
    return ListTask[indexChange+1];
  }

  get state$(): Observable<ListTask> {
    return this.store.getState$();
  }

  get state(): ListTask {
    return this.store.getState();
  }
}
