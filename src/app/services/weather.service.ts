import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiKey = '4f62ca97b5b50689cc68a31492ab0d14';

  constructor(private http : HttpClient) { }

  getWeather(city : string){
    // return this.http.get('https://api.openweathermap.org/data/2.5/weather?q={city}&appid={this.apiKey}');
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`;
  return this.http.get(apiUrl);
  }
}
