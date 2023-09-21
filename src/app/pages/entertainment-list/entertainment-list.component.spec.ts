import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntertainmentListComponent } from './entertainment-list.component';

describe('ReviewListComponent', () => {
  let component: EntertainmentListComponent;
  let fixture: ComponentFixture<EntertainmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntertainmentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntertainmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
