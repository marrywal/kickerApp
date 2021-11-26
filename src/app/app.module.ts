import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PlayersComponent } from './components/players/players.component';
import { MatchComponent } from './components/match/match.component';
import { StartComponent } from './components/start/start.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { PlayersDialogComponent } from './components/players/players-dialog/players-dialog.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PlayerService } from './services/player/player.service';
import { MatchService } from './services/match/match.service';
import { MatchNewEditComponent } from './components/match-new-edit/match-new-edit.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { StepDetailsComponent } from './components/match-new-edit/step-details/step-details.component';
import { StepTeamOneComponent } from './components/match-new-edit/step-team-one/step-team-one.component';
import { StepTeamTwoComponent } from './components/match-new-edit/step-team-two/step-team-two.component';
import { StepGamesComponent } from './components/match-new-edit/step-games/step-games.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PlayersComponent,
    MatchComponent,
    StartComponent,
    PlayersDialogComponent,
    MatchNewEditComponent,
    StepDetailsComponent,
    StepTeamOneComponent,
    StepTeamTwoComponent,
    StepGamesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    PlayerService,
    MatchService,
    {provide: MAT_DATE_LOCALE, useValue: 'de-DE'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
