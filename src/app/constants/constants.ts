export const temperatureColors = {
    belowZero: '#3366ff', // Blue for temperatures below 0°C
    zeroToTen: '#66ccff', // Light Blue for temperatures between 0°C and 10°C
    tenToTwenty: '#99ff99', // Green for temperatures between 10°C and 20°C
    twentyToThirty: '#ffcc66', // Orange for temperatures between 20°C and 30°C
    aboveThirty: '#ff6666' // Red for temperatures above 30°C
  };

  export function convertKelvinToCelsius(kelvin: number): number {
    return Math.round((kelvin - 273.15) * 10) / 10;
  }
  
  export function convertMetersToKilometers(meters: number): number {
    return meters / 1000; // Convert meters to kilometers
  }
  
  export function convertUnixTimestampToAMPM(unixTimestamp: number): string {
    const date = new Date(unixTimestamp * 1000); // Convert seconds to milliseconds
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'pm' : 'am';
  
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12; // Convert 0 to 12 for 12-hour format
  
    return `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
  }
  
  export function convertUnixTimestampToDateTime(unixTimestamp: number): string {
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