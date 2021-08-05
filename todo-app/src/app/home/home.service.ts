import { Injectable, OnDestroy } from '@angular/core';
import { homeStore } from './home.store';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { taskForm, listTask } from './home.store';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService implements OnDestroy {
  public subscriber: Subscription[] = [];
  public store = new homeStore();
  private apiUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  ngOnDestroy(): void {
    this.subscriber.forEach((sub: Subscription) => {sub.unsubscribe();});
  }

  postData(data: taskForm) {
    this.httpClient.post(this.apiUrl, data).pipe(
      map(() => this.getData()),
    ).subscribe((data) => console.log(data));
  }

  getData() {
    this.httpClient.get(this.apiUrl).subscribe((data: any) => {this.store.pushNext(data);});
  }

  moveData(data: {task: taskForm, nextTask: taskForm}) {
    this.httpClient.put(this.apiUrl, data).subscribe((data) => {
      console.log(data);
    });
  }

  deleteData(data: taskForm) {
    if (!data.taskName) {
      return;
    }

    this.httpClient.delete(`${this.apiUrl}/${data.id}`).subscribe((data) => {
      console.log(data);
      this.getData();
    });
  }

  moveTop(task: taskForm) {
    if (!task.taskName) {
      return {taskName: '', taskDes: ''};
    }

    const listTask: listTask = this.state;
    this.moveData({task: task, nextTask: listTask[0]});
    const taskName = task.taskName;
    const taskDes = task.taskDes;
    task.taskName = listTask[0].taskName;
    task.taskDes = listTask[0].taskDes;
    listTask[0].taskName = taskName;
    listTask[0].taskDes = taskDes;
    return listTask[0];
  }

  moveDown(task: taskForm) {
    if (!task.taskName) {
      return {taskName: '', taskDes: ''};
    }

    const listTask: listTask = this.state;
    const indexChange: number = listTask.findIndex((item: taskForm) => item.id == task.id);
    if (indexChange == this.state.length -1) {
      return {taskName: '', taskDes: ''};
    }

    this.moveData({task: task, nextTask: listTask[indexChange+1]});
    const taskName = task.taskName;
    const taskDes = task.taskDes;
    task.taskName = listTask[indexChange+1].taskName;
    task.taskDes = listTask[indexChange+1].taskDes;
    listTask[indexChange+1].taskName = taskName;
    listTask[indexChange+1].taskDes = taskDes;
    return listTask[indexChange+1];
  }

  get state$(): Observable<listTask> {
    return this.store.getState$();
  }

  get state(): listTask {
    return this.store.getState();
  }
}
