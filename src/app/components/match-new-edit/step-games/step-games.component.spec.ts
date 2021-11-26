import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepGamesComponent } from './step-games.component';

describe('StepGamesComponent', () => {
  let component: StepGamesComponent;
  let fixture: ComponentFixture<StepGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepGamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
