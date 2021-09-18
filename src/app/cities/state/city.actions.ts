import { createAction, props } from '@ngrx/store';
import { City } from '../city';

export const setCurrentCityId = createAction(
  '[City] Set Current City Id',
  props<{ currentCityId: number }>()
);

export const clearCurrentCity = createAction('[City] Clear Current City');

export const initCurrentCity = createAction('[City] Init Current City');

export const loadCities = createAction('[City] Load');

export const loadCitiesSuccess = createAction(
  '[City] Load Success',
  props<{ cities: City[] }>()
);

export const loadCitiesFailure = createAction(
  '[City] Load Fail',
  props<{
    error: string;
  }>()
);

export const createCity = createAction(
  '[City] Create city',
  props<{
    city: City;
  }>()
);

export const createCitySuccess = createAction(
  '[City] Create Success',
  props<{
    city: City;
  }>()
);

export const createCityFailure = createAction(
  '[City] Create Fail',
  props<{
    error: string;
  }>()
);

export const updateCity = createAction(
  '[City] Update city',
  props<{
    city: City;
  }>()
);

export const updateCitySuccess = createAction(
  '[City] Update Success',
  props<{
    city: City;
  }>()
);

export const updateCityFailure = createAction(
  '[City] Update Fail',
  props<{
    error: string;
  }>()
);

export const deleteCity = createAction(
  '[City] Delete city',
  props<{
    id: number;
  }>()
);

export const deleteCitySuccess = createAction(
  '[City] Delete Success',
  props<{
    id: number;
  }>()
);

export const deleteCityFailure = createAction(
  '[City] Delete Fail',
  props<{
    error: string;
  }>()
);
