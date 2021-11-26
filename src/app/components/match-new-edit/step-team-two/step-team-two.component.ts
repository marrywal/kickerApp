import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatchService } from 'src/app/services/match/match.service';
import { PlayerService } from 'src/app/services/player/player.service';
import { Player } from 'src/interfaces/player';

@Component({
  selector: 'step-team-two',
  templateUrl: './step-team-two.component.html',
  styleUrls: ['./step-team-two.component.scss']
})
export class StepTeamTwoComponent implements OnInit {

  teamTwoFormGroup: FormGroup;

  playerFilter: { // TODO:  <- umbenennen
    playerOne?: Observable<Player[]>,
    playerTwo?: Observable<Player[]>
  } = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _playerService: PlayerService,
    private _matchService: MatchService
    ) {
    this.teamTwoFormGroup = this._formBuilder.group({
      playerOne: ['', Validators.required],
      playerTwo: ['', Validators.required]
    });

    this._matchService.stepReady(this.teamTwoFormGroup, 'teamTwo')
  }

  ngOnInit(): void {
    this.playerFilter = {
      playerOne: this._playerService.getFilteredPlayer(this.teamTwoFormGroup, 'playerOne'),
      playerTwo: this._playerService.getFilteredPlayer(this.teamTwoFormGroup, 'playerTwo')
     }
  }

}
