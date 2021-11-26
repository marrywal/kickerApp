import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatchService } from 'src/app/services/match/match.service';
import { getCities } from 'src/assets/data/cityData';
import { getModes } from 'src/assets/data/modeData';

@Component({
  selector: 'step-details',
  templateUrl: './step-details.component.html',
  styleUrls: ['./step-details.component.scss']
})
export class StepDetailsComponent implements OnInit {

  detailsFormGroup: FormGroup;
  cities: string[] = [];
  modes: string[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    public _matchService: MatchService
  ) {
    this.detailsFormGroup = this._formBuilder.group({
      date: [new Date(), Validators.required],
      city: ['', Validators.required],
      mode: ['', Validators.required],
    });

    this._matchService.stepReady(this.detailsFormGroup, 'details')
  }

  ngOnInit(): void {
    this.cities = getCities();
    this.modes = getModes();
  }

}
