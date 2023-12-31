import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvCardComponent } from './tv-card.component';

describe('TvReviewCardComponent', () => {
  let component: TvCardComponent;
  let fixture: ComponentFixture<TvCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
