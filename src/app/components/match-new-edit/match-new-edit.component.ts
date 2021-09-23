import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-match-new-edit',
  templateUrl: './match-new-edit.component.html',
  styleUrls: ['./match-new-edit.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class MatchNewEditComponent implements OnInit {

  matchId: number = 0;

  stepperOrientation: Observable<StepperOrientation>;
  detailsFormGroup: FormGroup;
  teamOneFormGroup: FormGroup;
  teamTwoFormGroup: FormGroup;
  gamesFormGroup: FormGroup;

  constructor(
    public breakpointObserver: BreakpointObserver,
    private _formBuilder: FormBuilder,
    private actRoute: ActivatedRoute
  ) {
    this.detailsFormGroup = this._formBuilder.group({
      date: [new Date(), Validators.required],
      city: ['', Validators.required],
      mode: ['', Validators.required],
    });
    this.teamOneFormGroup = this._formBuilder.group({
      playerOne: ['', Validators.required],
      playerTwo: ['', Validators.required]
    });
    this.teamTwoFormGroup = this._formBuilder.group({
      playerOne: ['', Validators.required],
      playerTwo: ['', Validators.required]
    });
    this.gamesFormGroup = this._formBuilder.group({
      tbd: ['', Validators.required] // TODO: tbd
    });

    this.matchId = this.actRoute.snapshot.params.id;

    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({ matches }) => matches ? 'horizontal' : 'vertical'));
  }

  ngOnInit(): void {
    
  }

  createEditMatch(): void {
    console.log('match saved')
  }

  goToMatches(): void {
    console.log('go to matches')
  }

}

/**
 * 1 - Match anlegen
 * Datum vorausgefüllz heute
 * Standort
 * MatchModus
 *
 * 2 - Spieler definieren
 * Team 1 Spieler 1
 * Spieler 2
 * Team 2 Spieler 1
 * Spieler 2
 *
 * 3 - Spiel hinzufügen
 * pro Abschnitt ein Spiel, mit + neues hinzufügen
 * Team 1 Spieler1 vorausgewählt
 * Position wählen
 * Spieler2 vorausgewählt
 * Position wählen
 * Team 2 Spieler1 vorausgewählt
 * Position wählen
 * Spieler2 vorausgewählt
 * Position wählen
 * Ergebnis : Ergebnis
 *
 * 4 - Glückwunsch an Gewinnerteam
 *
 *
 *
 *
 *
 *
 */