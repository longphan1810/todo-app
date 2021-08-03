import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { homeStore } from './home.store';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService implements OnDestroy {
  public subscriber: any = [];
  public _store = new homeStore();
  private apiurl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  ngOnDestroy(): void {
    this.subscriber.forEach((sub: any) => {sub.unsubscribe();});
  }

  initialize() {
    this._store = new homeStore;
  }

  postData (data: any) {
    const postData = this.httpClient.post(this.apiurl, data).subscribe((data) => {
      console.log('success', data);
      this.getData()
    }, (error) => console.log('oops', error));
    this.subscriber.push(postData);
  }

  getData() {
    const getData = this.httpClient.get(this.apiurl).subscribe((data: any) => {this._store.pushNext(data);});
    this.subscriber.push(getData);
  }

  moveData(data: any) {
    const move = this.httpClient.put(this.apiurl, data).subscribe((data) => {
      console.log(data);
    });
    this.subscriber.push(move);
  }

  deleteData(data: any) {
    const deleted = this.httpClient.delete(`${this.apiurl}/${data.id}`, data).subscribe((data) => console.log(data));
    this.subscriber.push(deleted);
  }

  moveTop(task: any, listTask: any[]) {
    if (task.taskName == null) {
      return;
    }

    this.moveData({task: task, nextTask: listTask[0]});
    let taskName = task.taskName;
    let taskDes = task.taskDes;
    task.taskName = listTask[0].taskName;
    task.taskDes = listTask[0].taskDes;
    listTask[0].taskName = taskName;
    listTask[0].taskDes = taskDes;
  }

  moveDown(task: any, listTask: any) {
    if (task.taskName == null) {
      return;
    }

    let indexChange: any = listTask.findIndex((item: any) => item.id == task.id);
    if (indexChange == this.state.length -1) {
      return;
    }

    this.moveData({task: task, nextTask: listTask[indexChange+1]});
    let taskName = task.taskName;
    let taskDes = task.taskDes;
    task.taskName = listTask[indexChange+1].taskName;
    task.taskDes = listTask[indexChange+1].taskDes;
    listTask[indexChange+1].taskName = taskName;
    listTask[indexChange+1].taskDes = taskDes;
  }

  get state$() {
    return this._store.getState$();
  }

  get state() {
    return this._store.getState();
  }
}
