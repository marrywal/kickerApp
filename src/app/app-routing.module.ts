import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GameComponent } from './game/game.component';
import { MatchComponent } from './match/match.component';
import { PlayersComponent } from './players/players.component';
import { StartComponent } from './start/start.component';

const routes: Routes = [
  { path: 'start', component: StartComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'match', component: MatchComponent },
  { path: 'game', component: GameComponent },
  { path: 'players', component: PlayersComponent },
  { path: '',   redirectTo: '/start', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
