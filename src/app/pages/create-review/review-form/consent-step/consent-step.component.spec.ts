import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentStepComponent } from './consent-step.component';

describe('ConsentStepComponent', () => {
  let component: ConsentStepComponent;
  let fixture: ComponentFixture<ConsentStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsentStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsentStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
