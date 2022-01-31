import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { BackendService } from '../backend.service';
import { ListComponent } from './list.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        BrowserModule,
        AppRoutingModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        MatDialogModule,
        MatSelectModule,
        MatCardModule,
        MatChipsModule,
      ],
      providers: [
        { provide: BackendService, useValue: new BackendService() },
        { provide: Router, useValue: Router },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the list', () => {
    const fixture = TestBed.createComponent(ListComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(ListComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Tasks List');
  });

  it('should be ok', async(() => {
    let fixture = TestBed.createComponent(ListComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let input = fixture.debugElement.query(By.css('input'));
      let el = input.nativeElement;

      expect(el.value).toBe('task');

      el.value = 'someValue';
      el.dispatchEvent(new Event('input'));

      expect(fixture.componentInstance.task).toBe('someValue');
    });
  }));
  


});
