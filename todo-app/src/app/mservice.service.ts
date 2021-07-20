import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MserviceService {
  private apiurl = 'http://localhost:8080';
  public listTask = [];
  constructor(private httpClient: HttpClient) { }
  getData() {
    return this.httpClient.get(this.apiurl);
  }
  postData(data: any) {
    console.log('task to be add: ', data);
    return this.httpClient.post(this.apiurl, data);

  }
  deleteData(data: any) {
    return this.httpClient.delete(`${this.apiurl}/${data.id}`, data);
  }

  move(data: any) {
    return this.httpClient.put(this.apiurl, data);
  }


}

