import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Match } from 'src/interfaces/match';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private _jsonURL = 'assets/mocks/matches.json';

  constructor(private http: HttpClient) { }

  getMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(this._jsonURL);
  }
}
