import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchNewEditComponent } from './match-new-edit.component';

describe('MatchNewEditComponent', () => {
  let component: MatchNewEditComponent;
  let fixture: ComponentFixture<MatchNewEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchNewEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchNewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
