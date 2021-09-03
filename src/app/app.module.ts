import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PlayersComponent } from './players/players.component';
import { GameComponent } from './game/game.component';
import { MatchComponent } from './match/match.component';
import { StartComponent } from './start/start.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { PlayersDialogComponent } from './players/players-dialog/players-dialog.component'


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    PlayersComponent,
    GameComponent,
    MatchComponent,
    StartComponent,
    PlayersDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
