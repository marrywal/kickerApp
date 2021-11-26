import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatchService } from 'src/app/services/match/match.service';
import { getNumberByMode } from 'src/assets/data/modeData';
import { getPositions } from 'src/assets/data/positionData';
import { emptyGame, Game } from 'src/interfaces/match';

@Component({
  selector: 'step-games',
  templateUrl: './step-games.component.html',
  styleUrls: ['./step-games.component.scss']
})
export class StepGamesComponent implements OnInit {

  games: object[] = [];
  gamesFormGroup: FormGroup;
  gameStep = 0;
  positions: string[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    public _matchService: MatchService
  ) {
    this.gamesFormGroup = this._formBuilder.group({});

    this._matchService.stepReady(this.gamesFormGroup, 'games');
  }

  ngOnInit(): void {
    this.positions = getPositions();
    this.setGamesByMode();
  }

  setGamesByMode() {
    // const modeNumber = getNumberByMode(this._matchService.mainForm.value.mode); TODO:get selected mode
    const modeNumber = 5;

    this.games = [];
    for (let i = 0; i < modeNumber; i++) {
      let game = emptyGame();
      game.id = i + 1;
      this.games.push(game);

      this.gamesFormGroup.addControl(`onePlayerOnePosition${i}`, new FormControl(''));
      this.gamesFormGroup.addControl(`onePlayerTwoPosition${i}`, new FormControl(''));
      this.gamesFormGroup.addControl(`onePoints${i}`, new FormControl(''));
      this.gamesFormGroup.addControl(`twoPlayerOnePosition${i}`, new FormControl(''));
      this.gamesFormGroup.addControl(`twoPlayerTwoPosition${i}`, new FormControl(''));
      this.gamesFormGroup.addControl(`twoPoints${i}`, new FormControl(''));

    }
  }

  // saveGameByIndex(index: number) {
  //   // this.stepGamesSource.subscribe(form =>
  //   //   form.valueChanges.subscribe(val => {
  //   //     this.mainForm.value.games[index].lineUpOne.points = val.onePoints;
  //   //     this.mainForm.value.games[index].lineUpTwo.points = val.twoPoints;

  //   //     this.mainForm.value.games[index].lineUpOne.points = '';
  //   //     this.mainForm.value.games[index].lineUpTwo.points = '';

  //   //     console.log(this.games[index]);
  //   //     console.log(this.mainForm);
  //   //     console.log(this.mainForm.value);
  //   //   })
  //   // );
  //   // TODO: problem -> werte werden für alle (auch noch leere games übernommen)

  // }


  setStep(index: number) {
    this.gameStep = index;
  }

  nextStep() {
    console.log(this.gameStep)
    this.gameStep++;
  }

  prevStep() {
    this.gameStep--;
  }

}
