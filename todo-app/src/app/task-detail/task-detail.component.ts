import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskDetailService } from './task-detail.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
  providers: [TaskDetailComponent]
})

export class TaskDetailComponent implements OnInit {
  state: any = [];
  task: any = {};

  constructor(private route: ActivatedRoute,private taskDetailService: TaskDetailService) {}

  ngOnInit(): void {
    this.taskDetailService.getData()
    this.taskDetailService.state$.subscribe((state) => {
      this.state = state;
      const taskName = this.route.snapshot.params['taskName'];
      this.state.find((task: any) => task.taskName == taskName) ? this.task = this.state.find((task: any) => task.taskName == taskName) : this.task = {taskName: null, taskDes: null};
    });
  }

  handleDelete(task: any) {
    this.state = this.state.filter((item: any) => item !== task);
    this.taskDetailService.deleteData(task)
  }
}
