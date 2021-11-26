import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap, tap } from 'rxjs/operators';
import { Player } from 'src/interfaces/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private _jsonURL = 'assets/mocks/players.json';
  players: Player[] = [];

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<Player[]> {
    return this.players.length ?
      of(this.players) :
      this.http.get<Player[]>(this._jsonURL).pipe(tap(data => this.players = data))
  }

  getFilteredPlayer(teamFormGroup: FormGroup, player: any): Observable<Player[]> {
    return teamFormGroup.valueChanges
      .pipe(
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(val => {
          return this.filter(val[player] || '')
        })
      );
  }

  private filter(val: any): Observable<Player[]> {
    return this.getPlayers()
      .pipe(
        map(response => response.filter(player => {
          return player.name?.toLowerCase().includes(val.toLowerCase());
        }))
      );
  }

}
