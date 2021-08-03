import { BehaviorSubject, Observable } from "rxjs";

export class taskDetailStore {
  public state: BehaviorSubject<{taskName: null, taskDes: null}[]> = new BehaviorSubject([{taskName: null, taskDes: null}]);

  constructor() {}

  public getState$(): Observable<{taskName: null, taskDes: null}[]> {
    return this.state.asObservable();
  }

  public getState() {
    return this.state.value;
  }

  public pushNext(value: any) {
    this.state.next(value);
  }
}
