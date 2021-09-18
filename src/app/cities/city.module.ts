import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { CityEditComponent } from './city-edit/city-edit.component';
import { CityListComponent } from './city-list/city-list.component';
import { CityShellComponent } from './city-shell/city-shell.component';
import { CityEffects } from './state/city.effects';
import { cityReducer } from './state/city.reducer';

const routes = [
  {
    path: '',
    component: CityShellComponent,
  },
  { path: ':id', component: CityEditComponent },
];

@NgModule({
  declarations: [CityShellComponent, CityListComponent, CityEditComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('cityInfo', cityReducer),
    EffectsModule.forFeature([CityEffects]),
  ],
})
export class CityModule {}
