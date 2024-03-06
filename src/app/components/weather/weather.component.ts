import { Component } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { temperatureColors } from 'src/app/constants/constants';

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

  convertKelvinToCelsius(kelvin: number): number {
    return Math.round((kelvin - 273.15) * 10) / 10;
  }

  convertMetersToKilometers(meters: number): number {
    return meters / 1000; // Convert meters to kilometers
  }

  convertUnixTimestampToAMPM(unixTimestamp: number): string {
    const date = new Date(unixTimestamp * 1000); // Convert seconds to milliseconds
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'pm' : 'am';
  
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12; // Convert 0 to 12 for 12-hour format
  
    return `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
  }

  convertUnixTimestampToDateTime(unixTimestamp: number): string {
    const date = new Date(unixTimestamp * 1000); // Convert seconds to milliseconds
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
  
    const dateOptions: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    };
  
    const time = date.toLocaleString('en-US', timeOptions);
    const dateString = date.toLocaleString('en-US', dateOptions);
  
    return `${time}, ${dateString}`;
  }

  // selectColor(minTemp: number): string {
  //   if (minTemp < 0) {
  //     return '#3366ff'; // Blue for temperatures below 0°C
  //   } else if (minTemp >= 0 && minTemp < 10) {
  //     return '#66ccff'; // Light Blue for temperatures between 0°C and 10°C
  //   } else if (minTemp >= 10 && minTemp < 20) {
  //     return '#99ff99'; // Green for temperatures between 10°C and 20°C
  //   } else if (minTemp >= 20 && minTemp < 30) {
  //     return '#ffcc66'; // Orange for temperatures between 20°C and 30°C
  //   } else {
  //     return '#ff6666'; // Red for temperatures above 30°C
  //   }
  // }
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
  

  getWeatherIconUrl(iconCode: string): string {
    const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
    console.log(iconUrl);
    return iconUrl;
  }
}
