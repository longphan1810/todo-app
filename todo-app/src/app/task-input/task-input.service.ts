import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskInputService {
  private subcriber: any = [];
  private apiurl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {
  }

  ngOnDestroy(): void {
    this.subcriber.forEach((sub: any) => {sub.unsubscribe();});
  }

  postData (data:any) {
    const postData = this.httpClient.post(this.apiurl, data).subscribe((data) => console.log(data));
    this.subcriber.push(postData);
  }
}
