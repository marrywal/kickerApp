import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Match } from '../interfaces/match';
import { getMatches } from '../mocks/matches';
import { PlayersDialogComponent } from '../players/players-dialog/players-dialog.component';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MatchComponent implements OnInit {

  matchList: Match[] = [];

  tableHeader: string[] = [
    'datetime',
    'city',
    'mode',
    'teamone',
    'teamtwo',
    'endresult',
    'actions',
  ];

  clickedRows = new Set<Match>();
  newMatch: any;
  expandedElement!: Match | null;

  @ViewChild(MatTable) table!: MatTable<Match>;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.matchList = getMatches();
  }

  creaeteEditMatch(match?: Match) {
    const newMatch: Match = {
      id: 0
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = match ? match : newMatch;

    const dialogRef = this.dialog.open(PlayersDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data.id === 0) {
          this.createMatch(data);
        } else {
          this.editMatch(data);
        }
        console.log(this.matchList);
      }
    );
  }

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
