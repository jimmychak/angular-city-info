import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CityModule } from './cities/city.module';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './home/menu.component';
import { ShellComponent } from './home/shell.component';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import { State } from './state/app.state';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';

export function logger(reducer: ActionReducer<State>): any {
  // default, no options
  return storeLogger()(reducer);
}

export const metaReducers = environment.production ? [] : [logger];

@NgModule({
  declarations: [AppComponent, ShellComponent, MenuComponent, HomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CityModule,
    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
