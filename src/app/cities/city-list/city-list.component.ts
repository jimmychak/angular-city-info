import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { City } from '../city';

@Component({
  selector: 'city-list',
  templateUrl: './city-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityListComponent {
  @Input() cities: City[] | null | undefined;
  @Input() citySelected: City | null | undefined;
  @Input() errorMessage: string | null | undefined;

  @Output() initNewCity = new EventEmitter<void>();
  @Output() cityWasSelected = new EventEmitter<City>();

  onCitySelected(city: City) {
    this.cityWasSelected.emit(city);
  }

  newCity(): void {
    this.initNewCity.emit();
  }
}
