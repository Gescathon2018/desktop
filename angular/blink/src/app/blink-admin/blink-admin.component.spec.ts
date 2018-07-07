import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlinkAdminComponent } from './blink-admin.component';

describe('BlinkAdminComponent', () => {
  let component: BlinkAdminComponent;
  let fixture: ComponentFixture<BlinkAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlinkAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlinkAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
