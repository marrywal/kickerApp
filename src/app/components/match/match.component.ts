import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Match } from '../../../interfaces/match';
import { MatchService } from 'src/app/services/match/match.service';
import { Player } from 'src/interfaces/player';
import { PlayerService } from 'src/app/services/player/player.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MatchComponent implements OnInit {

  matchList: Match[] = [];
  playersList: Player[] = [];
  isLoading = true;

  tableHeader: string[] = [
    'date',
    'city',
    'mode',
    'teamone',
    'endresult',
    'teamtwo',
    'actions',
  ];

  clickedRows = new Set<Match>();
  newMatch: any;
  expandedElement!: Match | null;

  @ViewChild(MatTable) table!: MatTable<Match>;

   // Idee: pro Spalte button mit "Spiel hinzufügen" 
  //  als shortcut wenn match noch nicht die anzahl der spiele hat, 
  //  die im modus definiert wurden

  constructor(
    public dialog: MatDialog,
    private matchService: MatchService,
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.loadMatches();
    this.loadPlayers();
  }

  loadMatches() {
    this.matchService.getMatches().subscribe(d => {
      this.matchList = d;
      console.log(this.matchList);
      this.isLoading = false;
    }, () => this.isLoading = false);
  }

  loadPlayers() {
    this.playerService.getPlayers().subscribe(d => {
      this.playersList = d;
      this.isLoading = false;
    }, () => this.isLoading = false);
  }

  getPlayerById(id: number) {
    const player = this.playersList.find(player => player.id === id);
    return player?.name;
  }

  // createEditMatch(match?: Match) {
  //   const newMatch: Match = {
  //     id: 0
  //   };
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.data = match ? match : newMatch;

  //   const dialogRef = this.dialog.open(PlayersDialogComponent, dialogConfig);

  //   dialogRef.afterClosed().subscribe(
  //     data => {
  //       if (data.id === 0) {
  //         this.createMatch(data);
  //       } else {
  //         this.editMatch(data);
  //       }
  //       console.log(this.matchList);
  //     }
  //   );
  // }

  deleteMatch(player: Match) {
    const i = this.matchList.indexOf(player);
    if (i !== -1) {
      this.matchList.splice(i, 1);
    }
    this.table.renderRows();
  }

  private createMatch(match: Match) {
    this.matchList.push(match);
    this.table.renderRows();
  }

  private editMatch(match: Match) {
    const i = this.matchList.indexOf(match);
    if (i !== -1) {
      this.matchList[i] = match;
    }
  }
}
