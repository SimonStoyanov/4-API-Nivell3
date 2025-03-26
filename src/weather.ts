import {JsonWeather} from './interfaces.ts'

let currCoords: {lat: number, lon: number} = {lat: 0, lon: 0};
const weatherImg: HTMLImageElement | null = document.querySelector<HTMLImageElement>('#weatherIco');
const weatherDesc: HTMLImageElement | null = document.querySelector<HTMLImageElement>('#weatherDesc');
const weatherTemp: HTMLImageElement | null = document.querySelector<HTMLImageElement>('#weatherTemp');

function getCurrentLocation(): Promise<{ lat: number; lon: number }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by this browser."));
      }
  
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          reject(new Error(`Error getting location: ${error.message}`));
        }
      );
    });
}
  
async function fetchWeather(): Promise<JsonWeather> {
    await getCurrentLocation()
        .then((coords) => {
            currCoords = coords;
        })
        .catch((error) => console.error(error.message));
    
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${currCoords.lat}&lon=${currCoords?.lon}&appid=c28c9f75dbc33155113bd51d29dc3f9b&units=metric`);
    if (!res.ok) return Promise.reject("Failed to fetch weather data!");
    return await res.json();
}

export function getWeather(): void {
    fetchWeather()
        .then((data) => {
            if (weatherImg) weatherImg.src= `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            if (weatherDesc) weatherDesc.innerHTML = `${data.weather[0].description}`;
            if (weatherTemp) weatherTemp.innerHTML = `${data.main.temp} | ºC`;
        })
        .catch((error) => console.log(error))
}