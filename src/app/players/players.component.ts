import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/interfaces/player';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  players: Player[] = [
    {
      id: 1,
      name: 'Max Mustermann',
      city: 'München'
    },
    {
      id: 2,
      name: 'Klaus Kleber',
      city: 'Würzburg'
    },
    {
      id: 3,
      name: 'Pippi Langstrumpf',
      city: 'Berlin'
    }
  ];

  tableHeader: string[] = [
    'name',
    'city'
  ]

  dataSource = this.players;
  clickedRows = new Set<Player>();

  constructor() { }

  ngOnInit(): void {

  }

}
