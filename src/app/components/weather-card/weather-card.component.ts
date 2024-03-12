import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';
import { temperatureColors , convertUnixTimestampToDateTime,convertUnixTimestampToAMPM,convertMetersToKilometers,convertKelvinToCelsius} from 'src/app/constants/constants';


@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})

export class WeatherCardComponent implements OnInit {
  cityIds: string[] = [];
  weatherData: any[] = [];
  cities: any[] = [];

  constructor(private weatherService: WeatherService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getCities().subscribe(data => {
      this.cities = data.List;
      this.cityIds = this.cities.map(city => city.CityCode);
      this.getCitiesWeather();
    });
  }

  getCities(): Observable<any> {
    return this.http.get<any>('assets/cities.json');
  }
  
  getCitiesWeather() {
    this.cityIds.forEach((cityId, index) => {
      const city = this.cities.find(c => c.CityCode === cityId);
      if (city) {
        this.weatherService.getWeather(city.CityName)
          .subscribe(data => {
            this.weatherData[index] = data;
  
            // Check if weatherData has details for all cities
            if (this.weatherData.filter(Boolean).length === this.cityIds.length) {
              // All details are fetched, you can perform any additional logic here
            }
          });
      }
    });
  }

  selectColor(minTemp: number): string {
    if (minTemp < 0) {
      return temperatureColors.belowZero;
    } else if (minTemp >= 0 && minTemp < 10) {
      return temperatureColors.zeroToTen;
    } else if (minTemp >= 10 && minTemp < 20) {
      return temperatureColors.tenToTwenty;
    } else if (minTemp >= 20 && minTemp < 30) {
      return temperatureColors.twentyToThirty;
    } else {
      return temperatureColors.aboveThirty;
    }
  }

 
  convertKelvinToCelsius = convertKelvinToCelsius;
  convertMetersToKilometers = convertMetersToKilometers;
  convertUnixTimestampToAMPM = convertUnixTimestampToAMPM;
  convertUnixTimestampToDateTime = convertUnixTimestampToDateTime;

}
