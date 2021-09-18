import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { CityState } from './city.reducer';

export interface State extends AppState.State {
  cityInfo: CityState;
}

const getCityFeatureState = createFeatureSelector<CityState>('cityInfo');

export const getCurrentCityId = createSelector(
  getCityFeatureState,
  (state) => state.currentCityId
);

export const getCurrentCity = createSelector(
  getCityFeatureState,
  getCurrentCityId,
  (state, currentCityId) => {
    if (currentCityId === 0) {
      return {
        id: 0,
        name: '',
        description: '',
        numberOfPointsOfInterest: 0,
        pointsOfInterest: [],
      };
    } else {
      return currentCityId
        ? state.cities.find((c) => c.id === currentCityId)
        : null;
    }
  }
);

export const getCities = createSelector(
  getCityFeatureState,
  (state) => state.cities
);

export const getError = createSelector(
  getCityFeatureState,
  (state) => state.error
);
