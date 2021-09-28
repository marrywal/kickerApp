import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
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

}
