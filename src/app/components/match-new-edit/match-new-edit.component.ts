import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DateFormat } from 'src/interfaces/dateFormat';
import { StepDetailsComponent } from './step-details/step-details.component';
import { StepTeamOneComponent } from './step-team-one/step-team-one.component';
import { StepTeamTwoComponent } from './step-team-two/step-team-two.component';
import { StepGamesComponent } from './step-games/step-games.component';
import { MatchService } from 'src/app/services/match/match.service';

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

    { provide: MAT_DATE_FORMATS, useValue: DateFormat },
  ],
})
export class MatchNewEditComponent implements OnInit {

  @ViewChild('StepDetailsComponent') stepDetailsComponent: StepDetailsComponent;
  @ViewChild('StepTeamOneComponent') stepTeamOneComponent: StepTeamOneComponent;
  @ViewChild('StepTeamTwoComponent') stepTeamTwoComponent: StepTeamTwoComponent;
  @ViewChild('StepGamesComponent') stepGamesComponent: StepGamesComponent;

  default: FormGroup;

  get detailsFormGroup() {
    return this.stepDetailsComponent ? this.stepDetailsComponent.detailsFormGroup : this.default;
  }

  get teamOneFormGroup() {
    return this.stepTeamOneComponent ? this.stepTeamOneComponent.teamOneFormGroup : this.default;
  }

  get teamTwoFormGroup() {
    return this.stepTeamTwoComponent ? this.stepTeamTwoComponent.teamTwoFormGroup : this.default;
  }

  get gamesFormGroup() {
    return this.stepGamesComponent ? this.stepGamesComponent.gamesFormGroup : this.default;
  }

  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    public _breakpointObserver: BreakpointObserver,
    public _matchService: MatchService
  ) {
    this.stepperOrientation = _breakpointObserver.observe('(min-width: 768px)')
      .pipe(map(({ matches }) => matches ? 'horizontal' : 'vertical'));
  }

  ngOnInit(): void {
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