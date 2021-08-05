import { BehaviorSubject, Observable } from "rxjs";

export interface taskForm {
  id?: number,
  taskName: string,
  taskDes: string
}

export interface listTask extends Array<taskForm> {}

export class homeStore {
  private initState: listTask = [{id: 0, taskName: '', taskDes: ''}]
  public state: BehaviorSubject<listTask> = new BehaviorSubject(this.initState);

  public getState$(): Observable<listTask> {
    return this.state.asObservable();
  }

  public getState() {
    return this.state.value;
  }

  public pushNext(value: listTask) {
    this.state.next(value);
  }
}
