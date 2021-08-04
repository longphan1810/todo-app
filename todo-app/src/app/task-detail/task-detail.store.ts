import { BehaviorSubject, Observable } from "rxjs";

export interface taskInterface {
  id?: number,
  taskName: string,
  taskDes: string
}

export interface stateInterface extends Array<taskInterface> {}

export class taskDetailStore {
  private initState: stateInterface = [{id: 0, taskName: '', taskDes: ''}]
  public state: BehaviorSubject<stateInterface> = new BehaviorSubject(this.initState);

  constructor() {}

  public getState$(): Observable<stateInterface> {
    return this.state.asObservable();
  }

  public getState() {
    return this.state.value;
  }

  public pushNext(value: stateInterface) {
    this.state.next(value);
  }
}
