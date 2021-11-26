import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepTeamTwoComponent } from './step-team-two.component';

describe('StepTeamTwoComponent', () => {
  let component: StepTeamTwoComponent;
  let fixture: ComponentFixture<StepTeamTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepTeamTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepTeamTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
