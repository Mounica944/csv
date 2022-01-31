import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  id: any;
  task: any;
  user: any;
  constructor(
    private backend: BackendService,
    private routes: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routes.params.subscribe((res: any) => {
      console.log(res);
      this.backend.task(res.id).subscribe((task: any) => {
        this.backend.user(task.assigneeId).subscribe((user: any) => {
          this.task = task;
          this.user = user;
        });
      });
    });
  }
  back() {
    this.router.navigate(['/']);
  }
}
