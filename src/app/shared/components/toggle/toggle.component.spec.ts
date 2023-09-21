import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleComponentComponent } from './toggle.component';

describe('ToggleComponentComponent', () => {
  let component: ToggleComponentComponent;
  let fixture: ComponentFixture<ToggleComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToggleComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
