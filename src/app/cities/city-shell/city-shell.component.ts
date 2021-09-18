import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { City } from '../city';
import * as CityActions from '../state/city.actions';
import { getCities, getCurrentCity, getError, State } from '../state';

@Component({
  templateUrl: './city-shell.component.html',
})
export class CityShellComponent implements OnInit{
  cities$!: Observable<City[]>;
  citySelected$!: Observable<City | null | undefined>;
  errorMessage$!: Observable<string>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(CityActions.loadCities());
    this.cities$ = this.store.select(getCities);
    this.citySelected$ = this.store.select(getCurrentCity);
    this.errorMessage$ = this.store.select(getError);
  }

  citySelected(city: City) {
    this.store.dispatch(
      CityActions.setCurrentCityId({ currentCityId: city.id })
    );
  }

  newCity(): void {
    this.store.dispatch(CityActions.initCurrentCity());
  }
}
