import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, mergeMap, concatMap } from 'rxjs/operators';
import { CityService } from '../city.service';
import * as CityActions from './city.actions';

@Injectable()
export class CityEffects {
  constructor(private actions$: Actions, private cityService: CityService) {}

  loadCities$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CityActions.loadCities),
      mergeMap(() =>
        this.cityService.getCities().pipe(
          map((cities) => CityActions.loadCitiesSuccess({ cities })),
          catchError((error) => of(CityActions.loadCitiesFailure({ error })))
        )
      )
    );
  });

  createCity$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CityActions.createCity),
      concatMap((action) =>
        this.cityService.createCity(action.city).pipe(
          map((city) => CityActions.createCitySuccess({ city })),
          catchError((error) => of(CityActions.createCityFailure({ error })))
        )
      )
    );
  });

  updateCity$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CityActions.updateCity),
      concatMap((action) =>
        this.cityService.updateCity(action.city).pipe(
          map(() => CityActions.updateCitySuccess({ city: action.city })),
          catchError((error) => of(CityActions.updateCityFailure({ error })))
        )
      )
    );
  });

  deleteCity$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CityActions.deleteCity),
      mergeMap((action) =>
        this.cityService.deleteCity(action.id).pipe(
          map(() => CityActions.deleteCitySuccess({ id: action.id })),
          catchError((error) => of(CityActions.deleteCityFailure({ error })))
        )
      )
    );
  });
}
