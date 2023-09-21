import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntertainmentCardComponent } from './entertainment-card.component';

describe('EntertainmentCardComponent', () => {
  let component: EntertainmentCardComponent;
  let fixture: ComponentFixture<EntertainmentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntertainmentCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntertainmentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
