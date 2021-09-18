import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from './city';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private readonly url = 'http://localhost:65494/api/cities';

  constructor(private http: HttpClient) {}

  getCities() {
    return this.http.get<City[]>(this.url);
  }

  createCity(city: City) {
    return this.http.post<City>(this.url, city);
  }

  updateCity(city: City) {
    return this.http.put<void>(`${this.url}/${city.id}`, city);
  }

  deleteCity(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
