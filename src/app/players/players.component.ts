import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Player } from 'src/app/interfaces/player';
import { getPlayers } from '../mocks/players';
import { PlayersDialogComponent } from './players-dialog/players-dialog.component';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  playersList: Player[] = [];

  tableHeader: string[] = [
    'name',
    'city',
    'actions'
  ]

  clickedRows = new Set<Player>();
  newPlayer: any;

  @ViewChild(MatTable) table!: MatTable<Player>;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.playersList = getPlayers();
  }

  creaeteEditPlayer(player?: Player) {
    const newPlayer: Player = {
      id: 0,
      name: '',
      city: ''
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = player ? player : newPlayer;

    const dialogRef = this.dialog.open(PlayersDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data.id === 0) {
          this.createPlayer(data);
        } else {
          this.editPlayer(data);
        }
        console.log(this.playersList);
      }
    );
  }

  deletePlayer(player: Player) {
    const i = this.playersList.indexOf(player);
    if (i !== -1) {
      this.playersList.splice(i, 1);
    }
    this.table.renderRows();
  }

  private createPlayer(player: Player) {
    this.playersList.push(player);
    this.table.renderRows();
  }

  private editPlayer(player: Player) {
    const i = this.playersList.indexOf(player);
    if (i !== -1) {
      this.playersList[i] = player;
    }
  }
}
