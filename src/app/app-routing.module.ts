import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatchNewEditComponent } from './components/match-new-edit/match-new-edit.component';
import { MatchComponent } from './components/match/match.component';
import { PlayersComponent } from './components/players/players.component';
import { StartComponent } from './components/start/start.component';

const routes: Routes = [
  { path: 'start', component: StartComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'match/:id', component: MatchNewEditComponent },
  { path: 'match', component: MatchComponent },
  { path: 'players', component: PlayersComponent },
  { path: '',   redirectTo: '/start', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
