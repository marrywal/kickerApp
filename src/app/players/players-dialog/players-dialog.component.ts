import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Player } from 'src/app/interfaces/player';

@Component({
  selector: 'app-players-dialog',
  templateUrl: './players-dialog.component.html',
  styleUrls: ['./players-dialog.component.scss']
})
export class PlayersDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Player) {}

}
