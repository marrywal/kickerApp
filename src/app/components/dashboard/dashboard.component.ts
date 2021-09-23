import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { getCities } from 'src/assets/data/cityData';
import { PlayerService } from '../../services/player/player.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  tableBestPerson: any;
  isLoading = true;

  constructor(public playerService: PlayerService) { }

  ngOnInit(): void {
    this.tableBestPerson = {
      tableHeader: ['name', 'city', 'wins', 'losts'],
      selectedFilter: '',
      cities: getCities()
    };
    this.loadPlayers();
  }

  private loadPlayers() {
    this.playerService.getPlayers().subscribe(d => {
      this.tableBestPerson.dataSource = new MatTableDataSource(d);
      this.isLoading = false;
    }, () => this.isLoading = false);
  }

  applyFilterTableBestPerson(event: Event, value: string) {
    console.log(value);
    this.tableBestPerson.dataSource.filter = value;
  }
}
