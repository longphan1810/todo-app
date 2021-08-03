import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { homeStore } from './home.store';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService implements OnDestroy {
  public subscriber: any[] = [];
  public store = new homeStore();
  private apiUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  ngOnDestroy(): void {
    this.subscriber.forEach((sub: any) => {sub.unsubscribe();});
  }

  postData (data: any) {
    const postData = this.httpClient.post(this.apiUrl, data).subscribe((data) => {
      console.log('success', data);
      this.getData()
    }, (error) => console.log('oops', error));
    this.subscriber.push(postData);
  }

  getData() {
    const getData = this.httpClient.get(this.apiUrl).subscribe((data: any) => {this.store.pushNext(data);});
    this.subscriber.push(getData);
  }

  moveData(data: any) {
    const move = this.httpClient.put(this.apiUrl, data).subscribe((data) => {
      console.log(data);
    });
    this.subscriber.push(move);
  }

  deleteData(data: any) {
    if (!data.taskName) {
      return;
    }

    const deleted = this.httpClient.delete(`${this.apiUrl}/${data.id}`, data).subscribe((data) => {
      console.log(data);
      this.getData();
    });
    this.subscriber.push(deleted);
  }

  moveTop(task: any) {
    if (!task.taskName) {
      return {taskName: null, taskDes: null};
    }

    let listTask: any[] = this.state;
    this.moveData({task: task, nextTask: listTask[0]});
    let taskName = task.taskName;
    let taskDes = task.taskDes;
    task.taskName = listTask[0].taskName;
    task.taskDes = listTask[0].taskDes;
    listTask[0].taskName = taskName;
    listTask[0].taskDes = taskDes;
    return listTask[0];
  }

  moveDown(task: any) {
    if (!task.taskName) {
      return {taskName: null, taskDes: null};
    }

    let listTask: any[] = this.state;
    let indexChange: any = listTask.findIndex((item: any) => item.id == task.id);
    if (indexChange == this.state.length -1) {
      return {taskName: null, taskDes: null};
    }

    this.moveData({task: task, nextTask: listTask[indexChange+1]});
    let taskName = task.taskName;
    let taskDes = task.taskDes;
    task.taskName = listTask[indexChange+1].taskName;
    task.taskDes = listTask[indexChange+1].taskDes;
    listTask[indexChange+1].taskName = taskName;
    listTask[indexChange+1].taskDes = taskDes;
    return listTask[indexChange+1];
  }

  get state$(): Observable<{taskName: null, taskDes: null}[]> {
    return this.store.getState$();
  }

  get state() {
    return this.store.getState();
  }
}
