import { BehaviorSubject, Observable } from "rxjs";

export interface TaskForm {
  id?: number,
  taskName: string,
  taskDes: string
}

export interface ListTask extends Array<TaskForm> {}

export class TaskDetailStore {
  private initState: ListTask = [{id: 0, taskName: '', taskDes: ''}]
  public state: BehaviorSubject<ListTask> = new BehaviorSubject(this.initState);

  public getState$(): Observable<ListTask> {
    return this.state.asObservable();
  }

  public getState() {
    return this.state.value;
  }

  public pushNext(value: ListTask) {
    this.state.next(value);
  }
}
