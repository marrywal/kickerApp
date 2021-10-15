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
import { getModes, getNumberByMode } from 'src/assets/data/modeData';
import { PlayerService } from 'src/app/services/player/player.service';
import { Player } from 'src/interfaces/player';
import { DateFormat } from 'src/interfaces/dateFormat';
import { Match, Game, emptyGame } from 'src/interfaces/match';
import { getPositions } from 'src/assets/data/positionData';

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
  positions: string[] = [];
  games: Game[] = [];
  gameStep = 0;

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
      playerOne: ['', Validators.required],
      playerTwo: ['', Validators.required]
    });
    this.teamTwoFormGroup = this._formBuilder.group({
      playerOne: ['', Validators.required],
      playerTwo: ['', Validators.required]
    });
    this.gamesFormGroup = this._formBuilder.group({ // TODO: tbd
      onePlayerOnePosition: ['', Validators.required],
      onePlayerTwoPosition: ['', Validators.required],
      onePoints: [null, Validators.required],
      twoPlayerOnePosition: ['', Validators.required],
      twoPlayerTwoPosition: ['', Validators.required],
      twoPoints: [null, Validators.required],
    });

    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({ matches }) => matches ? 'horizontal' : 'vertical'));

  }

  ngOnInit(): void {
    this.cities = getCities();
    this.modes = getModes();
    this.positions = getPositions();

    this.playerFilter = {
      onePlayerOne: this.filterPlayer(this.teamOneFormGroup, 'playerOne'),
      onePlayerTwo: this.filterPlayer(this.teamOneFormGroup, 'playerTwo'),
      twoPlayerOne: this.filterPlayer(this.teamTwoFormGroup, 'playerOne'),
      twoPlayerTwo: this.filterPlayer(this.teamTwoFormGroup, 'playerTwo'),
    }
  }

  setGamesByMode() {
    const modeNumber = getNumberByMode(this.detailsFormGroup.value.mode);
    this.games = [];
    for (let i = 0; i < modeNumber; i++) {
      let game = emptyGame();
      game.id = i+1;
      this.games.push(game);
    }
    console.log(this.games);
  }

  setStep(index: number) {
    this.gameStep = index;
  }

  nextStep() {
    this.gameStep++;
  }

  prevStep() {
    this.gameStep--;
  }



  createEditMatch(): void {
    console.log(this.playerFilter.onePlayerOne);
    let match: Match = {
      id: this.matchId,
      date: this.detailsFormGroup.value.date,
      city: this.detailsFormGroup.value.city,
      mode: this.detailsFormGroup.value.mode,
      teamOne: {
        points: 0,
        playerOne: this.teamOneFormGroup.value.playerOne,
        playerTwo: this.teamOneFormGroup.value.playerTwo
      },
      teamTwo: {
        points: 0,
        playerOne: this.teamTwoFormGroup.value.playerOne,
        playerTwo: this.teamTwoFormGroup.value.playerTwo
      }, // TODO: add games
    };
    console.log(match);
    console.log('match saved')
  }

  goToMatches(): void {
    console.log('go to matches')
  }

  private filterPlayer(teamFormGroup: FormGroup, player: any, playerId?: any): Observable<Player[]> {
    return teamFormGroup.valueChanges
      .pipe(
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(val => {
          return this.filter(val[player] || '')
        })
      );
  }

  private filter(val: any): Observable<Player[]> {
    return this.playerService.getPlayers()
      .pipe(
        map(response => response.filter(player => {
          return player.name?.toLowerCase().includes(val.toLowerCase());
        }))
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