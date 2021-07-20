import { Component, DoCheck, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MserviceService } from '../mservice.service';
@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  @Input()
  listTask: any = [];

  task: any = {};
  constructor(private route: ActivatedRoute,private myservice: MserviceService) { }

  ngOnInit(): void {

    this.myservice.getData().subscribe((data) => {
      this.listTask = data;
      console.log(this.listTask)
      const taskName = this.route.snapshot.params['taskName'];
      this.task = this.listTask.find((task: any) => task.taskName == taskName);
    });
    console.log(this.listTask)


  }
  handleDelete(task: any) {
    this.listTask = this.listTask.filter((item: any) => item !== task);
    this.myservice.deleteData(task).subscribe((data) => console.log(data));
  }
}
