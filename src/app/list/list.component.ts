import { Component, OnInit, Inject } from '@angular/core';
import { BackendService } from '../backend.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  tasks: any;
  users: any;
  displayedColumns: any = ['id', 'description'];
  task: string = '';
  showError: boolean = false;
  constructor(
    private backend: BackendService,
    public dialog: MatDialog,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.backend.users().subscribe((res: any) => {
      this.users = res;
      this.getTasks();
    });
  }
  getTasks() {
    this.backend.tasks().subscribe((res) => {
      this.tasks = res;
    });
  }
  createTask() {
    if (this.task) {
      this.showError = false;
      this.backend.newTask({ description: this.task }).subscribe((res) => {
        this.getTasks();
      });
      this.task = '';
    } else {
      this.showError = true;
    }
  }
  getUserName(id: number) {
    let user = this.users.find((user: any) => {
      return user.id == id;
    });
    return user ? `Assigned To: ${user.name}` : '';
  }

  taskCompleted(id: number, completed: boolean = true) {
    this.backend.complete(id, completed).subscribe((res) => {
      this.getTasks();
    });
  }
  openDialog(taskId: number) {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '350px',
      data: this.users,
    });

    dialogRef.afterClosed().subscribe((userId: number) => {
      this.backend.assign(taskId, userId).subscribe((res) => {
        this.getTasks();
      });
    });
  }
  view(id: number) {
    this.route.navigate(['/view-task/' + id]);
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `<h1 mat-dialog-title>Assign user for this task</h1>
    <div mat-dialog-content>
      <mat-form-field appearance="fill">
        <mat-label>Select User</mat-label>
        <mat-select [(ngModel)]="suser" name="suser">
          <mat-option *ngFor="let user of data" [value]="user.id">
            {{ user.name }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-raised-button (click)="onNoClick()">Assign</button>
    </div>`,
})
export class DialogOverviewExampleDialog {
  suser: any;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close(this.suser);
  }
}
