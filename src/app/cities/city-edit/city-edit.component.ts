import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GenericValidator } from 'src/app/shared/generic-validator';
import { City, PointOfInterest } from '../city';
import { getCurrentCity, State } from '../state';
import * as CityActions from '../state/city.actions';

const message = {};

@Component({
  selector: 'city-edit',
  templateUrl: './city-edit.component.html',
})
export class CityEditComponent implements OnInit {
  pageTitle: string = 'City Edit';
  city$!: Observable<City | null | undefined>;

  cityForm!: FormGroup;
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } } = {};
  private genericValidator: GenericValidator;

  get pointsOfInterest(): FormArray {
    return this.cityForm.get('pointsOfInterest') as FormArray;
  }

  constructor(private fb: FormBuilder, private store: Store<State>) {
    this.validationMessages = {
      cityName: {
        required: "City's name is required.",
        maxlength: "City's name cannot exceed 50 characters.",
        pattern: "City's name contains letters only",
      },
      cityDesc: {
        maxlength: "City's description cannot exceed 200 characters.",
      },
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.city$ = this.store
      .select(getCurrentCity)
      .pipe(tap((currentCity) => this.displayCity(currentCity)));

    this.cityForm = this.fb.group({
      cityName: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('[a-zA-Z ]*'),
        ],
      ],
      cityDesc: ['', [Validators.maxLength(200)]],
      pointsOfInterest: this.fb.array([]),
    });

    this.cityForm.valueChanges.subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(
        this.cityForm
      );
    });
  }

  buildPointOfinterest(): FormGroup {
    return this.fb.group({
      poiName: [''],
      poiDesc: [''],
    });
  }

  addPointOfInterest() {
    this.pointsOfInterest.push(this.buildPointOfinterest());
  }

  displayCity(city: City | null | undefined): void {
    if (city) {
      this.cityForm.reset();
      this.pointsOfInterest.clear();

      if (city.id === 0) {
        this.pageTitle = 'Add City';
      } else {
        this.pageTitle = `Edit City: ${city.name}`;
      }

      this.cityForm.patchValue({
        cityName: city.name,
        cityDesc: city.description,
      });

      if (city.pointsOfInterest && city.pointsOfInterest.length > 0) {
        for (let i = 0; i < city.pointsOfInterest.length; i++) {
          this.pointsOfInterest.push(this.buildPointOfinterest());
        }

        this.pointsOfInterest.patchValue(
          city.pointsOfInterest.map((p) => ({
            poiName: p.name,
            poiDesc: p.description,
          }))
        );
      } else {
        this.pointsOfInterest.push(this.buildPointOfinterest());
      }
    }
  }

  cancelEdit(city: City) {
    this.displayCity(city);
  }

  saveCity(originalCity: City) {
    if (this.cityForm.valid) {
      if (this.cityForm.dirty) {
        let newPointsOfInterest: PointOfInterest[] = [];
        for (let poi of this.cityForm.value.pointsOfInterest) {
          newPointsOfInterest.push({
            name: poi.poiName,
            description: poi.poiDesc,
          });
        }

        let newCity = {
          name: this.cityForm.value.cityName,
          description: this.cityForm.value.cityDesc,
          pointsOfInterest: newPointsOfInterest,
        };
        const city = { ...originalCity, ...newCity };
        if (city.id === 0) {
          this.store.dispatch(CityActions.createCity({ city }));
        } else {
          this.store.dispatch(CityActions.updateCity({ city }));
        }
      }
    }
  }

  deleteCity(city: City) {
    if (city && city.id) {
      if (confirm(`Really delete the city: ${city.name}?`)) {
        this.store.dispatch(CityActions.deleteCity({ id: city.id }));
      }
    } else {
      this.store.dispatch(CityActions.clearCurrentCity());
    }
  }
}
