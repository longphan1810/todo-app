import { BehaviorSubject, Observable } from "rxjs";

export class taskDetailStore {
  private INITIAL_STATE =  [];

  public _state = new BehaviorSubject(this.INITIAL_STATE);

  constructor() {}

  public getState$() {
    return this._state.asObservable();
  }

  public getState() {
    return this._state.value;
  }

  public pushNext(task: any) {
    this._state.next(task);
  }
}
