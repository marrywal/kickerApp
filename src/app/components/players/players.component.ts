import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Player } from 'src/interfaces/player';
import { PlayerService } from '../../services/player/player.service';
import { PlayersDialogComponent } from './players-dialog/players-dialog.component';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  playersList: any;
  isLoading = true;
  tableHeader: string[] = [
    'name',
    'city',
    'actions'
  ];

  clickedRows = new Set<Player>();
  newPlayer: any;

  @ViewChild('playerSort') playerSort!: MatSort; // TODO: sorting not works after page change

  constructor(public dialog: MatDialog, private playerService: PlayerService) { }

  ngOnInit(): void {
    console.log(this.playersList);
    this.loadPlayers();
  }

  loadPlayers() {
    this.playerService.getPlayers().subscribe(d => {
      this.playersList = new MatTableDataSource(d);
      this.playersList.sort = this.playerSort;
      console.log(this.playersList);
      this.isLoading = false;
    }, () => this.isLoading = false);
  }

  createEditPlayer(player?: Player) {
    const newPlayer: Player = {
      id: 0,
    };
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
    // const i = this.playersList.indexOf(player);
    // if (i !== -1) {
    //   this.playersList.splice(i, 1);
    // }
    // this.table.renderRows();
  }

  private createPlayer(player: Player) {
    // this.playersList.push(player);
    // this.table.renderRows();
  }

  private editPlayer(player: Player) {
    // const i = this.playersList.indexOf(player);
    // if (i !== -1) {
    //   this.playersList[i] = player;
    // }
  }
}
