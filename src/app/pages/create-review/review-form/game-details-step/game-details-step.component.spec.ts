import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDetailsStepComponent } from './game-details-step.component';

describe('GameDetailsStepComponent', () => {
  let component: GameDetailsStepComponent;
  let fixture: ComponentFixture<GameDetailsStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameDetailsStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameDetailsStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
