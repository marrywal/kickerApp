import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatchService } from 'src/app/services/match/match.service';
import { PlayerService } from 'src/app/services/player/player.service';
import { Player } from 'src/interfaces/player';

@Component({
  selector: 'step-team-one',
  templateUrl: './step-team-one.component.html',
  styleUrls: ['./step-team-one.component.scss']
})
export class StepTeamOneComponent implements OnInit {

  teamOneFormGroup: FormGroup;

  playerFilter: { // TODO:  <- umbenennen
    playerOne?: Observable<Player[]>,
    playerTwo?: Observable<Player[]>
  } = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _playerService: PlayerService,
    private _matchService: MatchService
  ) {
    this.teamOneFormGroup = this._formBuilder.group({
      playerOne: ['', Validators.required],
      playerTwo: ['', Validators.required]
    });

    this._matchService.stepReady(this.teamOneFormGroup, 'teamOne')
  }

  ngOnInit(): void {
    this.playerFilter = {
      playerOne: this._playerService.getFilteredPlayer(this.teamOneFormGroup, 'playerOne'),
      playerTwo: this._playerService.getFilteredPlayer(this.teamOneFormGroup, 'playerTwo')
    }
  }
  
}
