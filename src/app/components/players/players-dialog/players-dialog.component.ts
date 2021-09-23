import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Player } from 'src/interfaces/player';

@Component({
  selector: 'app-players-dialog',
  templateUrl: './players-dialog.component.html',
  styleUrls: ['./players-dialog.component.scss']
})
export class PlayersDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<PlayersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Player
  ) { }

  save() {
    // TODO: add validation on save
    this.dialogRef.close(this.data);
  }

  close() {
    // TODO: handle error on close
    this.dialogRef.close();
  }

}
