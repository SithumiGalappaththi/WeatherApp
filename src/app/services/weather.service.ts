import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { CacheService } from './cache.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiKey = environment.openWeatherMapApiKey;

  constructor(private http: HttpClient, private cacheService: CacheService) { }

  getWeather(city: string) {
    // Check if the weather data for the city is cached
    const cachedData = this.cacheService.get(city);
    if (cachedData) {
      // If cached data exists, return it as an observable
      return new Observable<any>((subscriber) => {
        subscriber.next(cachedData);
        subscriber.complete();
      });
    } else {
      // If no cached data exists, fetch data from the API
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`;
      return this.http.get(apiUrl).pipe(
        catchError(this.handleError),
        tap(data => {
          // Cache the fetched data
          this.cacheService.set(city, data);
        })
      );
    }
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
