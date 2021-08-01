import { BehaviorSubject, Observable } from "rxjs";



export class homeStore {
  private INITIAL_STATE =  [];

  public _state = new BehaviorSubject(this.INITIAL_STATE);

  constructor() {}

  public getState$() {
    return this._state.asObservable();
  }

  public getState() {
    return this._state.value;
  }

  public pushNext() {
    this._state.next(this._state.value);
  }
}
