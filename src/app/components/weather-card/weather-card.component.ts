import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent {
  cityIds: string[] = ['1248991', '1850147', '2644210', '2147714', '4930956','2988507','1796236','3143244'];
  weatherData: any[] = [];
  cities!: any[];

  constructor(private weatherService: WeatherService, private http: HttpClient) {
    this.getCities().subscribe(data => {
      this.cities = data.List;
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

  // selectColor(cityId: string): string {
  //   // Implement logic to select color based on city ID
  //   switch (cityId) {
  //     case '1248991':
  //       return '#0088ff'; 
  //     case '1850147':
  //       return '#770477'; 
  //     case '2644210':
  //       return '#0a8a0a'; 
  //     case '2147714':
  //       return '#d0841b'; 
  //     case '4930956':
  //       return '#be4545'; 
  //     default:
  //       return '#a0a01c'; 
  //   }
  // }
  selectColor(minTemp: number): string {
    if (minTemp < 0) {
      return '#3366ff'; // Blue for temperatures below 0°C
    } else if (minTemp >= 0 && minTemp < 10) {
      return '#66ccff'; // Light Blue for temperatures between 0°C and 10°C
    } else if (minTemp >= 10 && minTemp < 20) {
      return '#99ff99'; // Green for temperatures between 10°C and 20°C
    } else if (minTemp >= 20 && minTemp < 30) {
      return '#ffcc66'; // Orange for temperatures between 20°C and 30°C
    } else {
      return '#ff6666'; // Red for temperatures above 30°C
    }
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

}
