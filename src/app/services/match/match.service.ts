import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { getNumberByMode } from 'src/assets/data/modeData';
import { emptyGame, emptyMatch, Game, Match } from 'src/interfaces/match';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private _jsonURL = 'assets/mocks/matches.json';

  games: Game[] = [];
  match: Match;
  mainForm: FormGroup = this._formBuilder.group(emptyMatch());

  stepDetailsSource: Subject<FormGroup> = new Subject();
  stepDetails: Observable<FormGroup> = this.stepDetailsSource.asObservable();

  private stepTeamOneSource: Subject<FormGroup> = new Subject();
  stepTeamOne: Observable<FormGroup> = this.stepTeamOneSource.asObservable();

  private stepTeamTwoSource: Subject<FormGroup> = new Subject();
  stepTeamTwo: Observable<FormGroup> = this.stepTeamTwoSource.asObservable();

  private stepGamesSource: Subject<FormGroup> = new Subject();
  stepGames: Observable<FormGroup> = this.stepGamesSource.asObservable();

  constructor(
    private _http: HttpClient,
    private _actRoute: ActivatedRoute,
    private _formBuilder: FormBuilder
  ) {
    this.stepDetailsSource.subscribe(form =>
      form.valueChanges.subscribe(val => {
        this.mainForm.value.id = this._actRoute.snapshot.children[0].params.id,
          this.mainForm.value.date = val.date,
          this.mainForm.value.city = val.city
      })
    );
    this.stepTeamOneSource.subscribe(form =>
      form.valueChanges.subscribe(val => {
        this.mainForm.value.teamOne.playerOne = val.playerOne,
          this.mainForm.value.teamOne.playerTwo = val.playerTwo
      })
    );
    this.stepTeamTwoSource.subscribe(form =>
      form.valueChanges.subscribe(val => {
        this.mainForm.value.teamTwo.playerOne = val.playerOne,
          this.mainForm.value.teamTwo.playerTwo = val.playerTwo
      })
    );
    this.stepGamesSource.subscribe(form =>
      form.valueChanges.subscribe(val => {
        this.mainForm.value.mode = val.mode;
        let games = [];
        let teamOnePoints = 0;
        let teamTwoPoints = 0;
        let modeNumber = getNumberByMode(this.mainForm.value.mode);
        for (let i = 0; i < modeNumber; i++) {
          let game = emptyGame();
          game.id = i + 1;

          game.lineUpOne.players[0].name = this.mainForm.value.teamOne.playerOne;
          game.lineUpOne.players[0].position = val[`onePlayerOnePosition${i}`];
          game.lineUpOne.players[1].name = this.mainForm.value.teamOne.playerTwo;
          game.lineUpOne.players[1].position = val[`onePlayerTwoPosition${i}`];
          game.lineUpOne.points = val[`onePoints${i}`];
          teamOnePoints += val[`onePoints${i}`];
          game.lineUpTwo.players[0].name = this.mainForm.value.teamTwo.playerOne;
          game.lineUpTwo.players[0].position = val[`twoPlayerOnePosition${i}`];
          game.lineUpTwo.players[1].name = this.mainForm.value.teamTwo.playerTwo;
          game.lineUpTwo.players[1].position = val[`twoPlayerTwoPosition${i}`];
          game.lineUpTwo.points = val[`twoPoints${i}`];
          teamTwoPoints += val[`twoPoints${i}`];

          games.push(game);
        }
        this.mainForm.value.games = games;
        this.mainForm.value.teamOne.points = teamOnePoints;
        this.mainForm.value.teamTwo.points = teamTwoPoints;
      })
    );

  }

  stepReady(form: FormGroup, step: string) {
    switch (step) {
      case 'details':
        this.stepDetailsSource.next(form);
        break;
      case 'teamOne':
        this.stepTeamOneSource.next(form);
        break;
      case 'teamTwo':
        this.stepTeamTwoSource.next(form);
        break;
      case 'games':
        console.log(this.stepGamesSource)
        this.stepGamesSource.next(form);
        break;
      default:
        break;
    }
  }

  getMatches(): Observable<Match[]> {
    return this._http.get<Match[]>(this._jsonURL);
  }


  createEditMatch(): void {
    console.log(this.mainForm); // TODO: über neuen service gehn wie in stackblitz beispiel
    // const stepDetails = this.stepDetailsSource.value; // TODO: über neuen service gehn wie in stackblitz beispiel
    // const stepTeamOne = this.stepTeamOneComponent.teamOneFormGroup.value; // TODO: über neuen service gehn wie in stackblitz beispiel

    // let match: Match = {
    //   id: this._actRoute.snapshot.params.id,
    //   date: stepDetails.date,
    //   city: stepDetails.city,
    //   teamOne: {
    //     points: 0,
    //     playerOne: stepTeamOne.playerOne,
    //     playerTwo: stepTeamOne.playerTwo
    //   },
    //   teamTwo: {
    //     points: 0,
    //     playerOne: this.teamTwoFormGroup.value.playerOne,
    //     playerTwo: this.teamTwoFormGroup.value.playerTwo
    //   }, // TODO: add games
    // };
    // console.log(match);
    console.log('match saved')
    // console.log(this.gamesFormGroup.value.onePoints)
  }

  getMainForm(): FormGroup {
    return this.mainForm;
  }

}
