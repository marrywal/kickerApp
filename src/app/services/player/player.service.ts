import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from 'src/interfaces/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private _jsonURL = 'assets/mocks/players.json';

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this._jsonURL);
  }
}
