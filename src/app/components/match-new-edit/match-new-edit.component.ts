import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { getCities } from 'src/assets/data/cityData';
import { getModes } from 'src/assets/data/modeData';
import { PlayerService } from 'src/app/services/player/player.service';
import { Player } from 'src/interfaces/player';
import { DateFormat } from 'src/interfaces/dateFormat';

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

  matchId: number = 0;
  cities: string[] = [];
  modes: string[] = [];

  playerFilter: { // TODO:  <- umbenennen
    onePlayerOne?: Observable<Player[]>,
    onePlayerTwo?: Observable<Player[]>,
    twoPlayerOne?: Observable<Player[]>,
    twoPlayerTwo?: Observable<Player[]>
  } = {};

  stepperOrientation: Observable<StepperOrientation>;
  detailsFormGroup: FormGroup;
  teamOneFormGroup: FormGroup;
  teamTwoFormGroup: FormGroup;
  gamesFormGroup: FormGroup;

  constructor(
    public breakpointObserver: BreakpointObserver,
    private _formBuilder: FormBuilder,
    private actRoute: ActivatedRoute,
    private playerService: PlayerService
  ) {

    this.matchId = this.actRoute.snapshot.params.id;

    this.detailsFormGroup = this._formBuilder.group({
      date: [new Date(), Validators.required],
      city: ['', Validators.required],
      mode: ['', Validators.required],
    });
    this.teamOneFormGroup = this._formBuilder.group({
      onePlayerOne: ['', Validators.required],
      onePlayerTwo: ['', Validators.required]
    });
    this.teamTwoFormGroup = this._formBuilder.group({
      twoPlayerOne: ['', Validators.required],
      twoPlayerTwo: ['', Validators.required]
    });
    this.gamesFormGroup = this._formBuilder.group({ // TODO: weiter hier
      tbd: ['', Validators.required] // TODO: tbd
    });

    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({ matches }) => matches ? 'horizontal' : 'vertical'));

  }

  ngOnInit(): void {
    this.cities = getCities();
    this.modes = getModes();

    this.playerFilter = {
      onePlayerOne: this.filterPlayer(this.teamOneFormGroup, 'onePlayerOne'),
      onePlayerTwo: this.filterPlayer(this.teamOneFormGroup, 'onePlayerTwo'),
      twoPlayerOne: this.filterPlayer(this.teamTwoFormGroup, 'twoPlayerOne'),
      twoPlayerTwo: this.filterPlayer(this.teamTwoFormGroup, 'twoPlayerTwo')
    }
  }

  createEditMatch(): void {
    console.log('match saved')
  }

  goToMatches(): void {
    console.log('go to matches')
  }

  private filter(val: any): Observable<any[]> {
    return this.playerService.getPlayers()
      .pipe(
        map(response => response.filter(player => {
          return player.name?.toLowerCase().includes(val.toLowerCase())
        }))
      )
  }

  private filterPlayer(teamFormGroup: FormGroup, player: any): Observable<Player[]> {
    return teamFormGroup.valueChanges
      .pipe(
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(val => {
          console.log(val)
          return this.filter(val[player] || '')
        })
      );
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