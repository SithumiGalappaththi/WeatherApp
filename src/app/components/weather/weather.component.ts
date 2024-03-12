import { Component } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { temperatureColors , convertUnixTimestampToDateTime,convertUnixTimestampToAMPM,convertMetersToKilometers,convertKelvinToCelsius} from 'src/app/constants/constants';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  city !: string;
  weatherData : any;

  constructor(private weatherService : WeatherService){}

  ngOnInit(){}

  getWeather(){
    this.weatherService.getWeather(this.city)
    .subscribe(data => {
      this.weatherData = data;
      console.log(data);
    })
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
  

  getWeatherIconUrl(iconCode: string): string {
    const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
    console.log(iconUrl);
    return iconUrl;
  }
}
