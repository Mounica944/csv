import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';

import { DetailComponent } from './detail.component';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailComponent],
      providers: [
        { provide: BackendService, useValue: new BackendService() },
        { provide: Router, useValue: Router },
        { provide: ActivatedRoute, useValue: ActivatedRoute },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render button', async(() => {
    const fixture = TestBed.createComponent(DetailComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').textContent).toContain(
      'Back to List'
    );
  }));

  it('should render  h1 tag', async(() => {
    const fixture = TestBed.createComponent(DetailComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Task Details');
  }));
});
