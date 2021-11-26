import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepTeamOneComponent } from './step-team-one.component';

describe('StepTeamOneComponent', () => {
  let component: StepTeamOneComponent;
  let fixture: ComponentFixture<StepTeamOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepTeamOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepTeamOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
