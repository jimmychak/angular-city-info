import { createReducer, on } from '@ngrx/store';

import { City } from '../city';
import * as CityActions from './city.actions';

export interface CityState {
  cities: City[];
  currentCityId: number | null;
  error: string;
}

const initialState: CityState = {
  cities: [],
  currentCityId: null,
  error: '',
};

export const cityReducer = createReducer<CityState>(
  initialState,
  on(CityActions.setCurrentCityId, (state, action) => {
    return {
      ...state,
      currentCityId: action.currentCityId,
    };
  }),
  on(CityActions.clearCurrentCity, (state) => {
    return {
      ...state,
      currentCityId: null,
    };
  }),
  on(CityActions.initCurrentCity, (state) => {
    return {
      ...state,
      currentCityId: 0,
    };
  }),
  on(CityActions.loadCitiesSuccess, (state, action) => {
    return {
      ...state,
      cities: action.cities,
      error: '',
    };
  }),
  on(CityActions.loadCitiesFailure, (state, action) => {
    return {
      ...state,
      cities: [],
      error: action.error,
    };
  }),
  on(CityActions.createCitySuccess, (state, action) => {
    return {
      ...state,
      cities: [...state.cities, action.city],
      currentCityId: action.city.id,
      error: '',
    };
  }),
  on(CityActions.createCityFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(CityActions.updateCitySuccess, (state, action) => {
    const updatedCities = state.cities.map((c) =>
      c.id === action.city.id ? action.city : c
    );
    return {
      ...state,
      cities: updatedCities,
      currentCityId: action.city.id,
      error: '',
    };
  }),
  on(CityActions.updateCityFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(CityActions.deleteCitySuccess, (state, action) => {
    return {
      ...state,
      currentCityId: null,
      cities: state.cities.filter((c) => c.id !== action.id),
      error: '',
    };
  }),
  on(CityActions.deleteCityFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  })
);
