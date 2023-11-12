// import { ILocation } from "./types";
import { ILocation } from "../models/stateApp";

/**
 * Хук для поиска местоположений по текстовому запросу
 * @param { string } userInput - пользовательский ввод в строку поиска
 * @returns
 */
export async function getSearchLocations(userInput: string) {
  const url = new URL("https://api.openweathermap.org/geo/1.0/direct");
  url.search = new URLSearchParams({
    limit: "15",
    q: userInput,
    appid: "49b8785c49a510159343b52e91604bde", //config.API_KEY
  }).toString();
  try {
    const response = await fetch(url);
    if (response.status === 200) {
      const cities = await response.json();
      return cities;
    }
    throw new Error(`Response code  ${response.status}!`);
  } catch {
    return [];
  }
}

/**
 * Функция получения населенного пункта для координат пользователя
 * @param { GeolocationPosition } position - объект геопозиции пользователя
 * @returns
 */
export async function getCityByPosition(position: GeolocationPosition) {
  const url = new URL("https://api.openweathermap.org/geo/1.0/reverse");
  url.search = new URLSearchParams({
    limit: "1",
    lat: position.coords.latitude.toString(),
    lon: position.coords.longitude.toString(),
    appid: "49b8785c49a510159343b52e91604bde",
  }).toString();
  try {
    const response = await fetch(url);
    if (response.status === 200) {
      const cities: ILocation[] = await response.json();
      if (cities.length) {
        return cities;
      } else {
        throw new Error(
          "Не удается получить погоду для вашего местоположения."
        );
      }
    }
    throw new Error(`Response status code is ${response.status}!`);
  } catch {
    return [];
  }
}

/**
 * Загрузка подробного прогноза на день
 * @param { import ("./types").ILocation } location - объект места для которого загружается погода
 * @param { number } parts - количество timestamp для которых загружается погода
 * @returns
 */
export async function getDailyWeather(location: ILocation, parts: number) {
  const url = new URL("https://api.openweathermap.org/data/2.5/forecast");
  url.search = new URLSearchParams({
    lat: location.lat.toString(),
    lon: location.lon.toString(),
    units: "metric",
    cnt: parts.toString(),
    lang: "ru",
    appid: "49b8785c49a510159343b52e91604bde",
  }).toString();

  const response = await fetch(url);
  if (response.status === 200) {
    const forecast = await response.json();
    return forecast;
  }
  throw new Error(`Response status code is ${response.status}!`);
}
// https://api.openweathermap.org/data/2.5/forecast/daily?lat=32.9699363&lon=59.7093402&units=metric&cnt=5&lang=ru&appid=49b8785c49a510159343b52e91604bde
export async function getFiveDays(location: ILocation) {
  const url = new URL("https://api.openweathermap.org/data/2.5/forecast/daily");
  url.search = new URLSearchParams({
    lat: location.lat.toString(),
    lon: location.lon.toString(),
    units: "metric",
    cnt: "7",
    lang: "ru",
    appid: "49b8785c49a510159343b52e91604bde",
  }).toString();

  const response = await fetch(url);
  if (response.status === 200) {
    const fiveDaysForecast = await response.json();
    return fiveDaysForecast;
  }
  throw new Error(`Response status code is ${response.status}!`);
}

export async function getCurrentWeather(location: ILocation) {
  const url = new URL("https://api.openweathermap.org/data/2.5/weather");
  url.search = new URLSearchParams({
    lat: location.lat.toString(),
    lon: location.lon.toString(),
    units: "metric",
    lang: "ru",
    appid: "49b8785c49a510159343b52e91604bde",
  }).toString();
  const response = await fetch(url);
  if (response.status === 200) {
    const fiveDaysForecast = await response.json();
    return fiveDaysForecast;
  }
  throw new Error(`Response status code is ${response.status}!`);
}

// export { getCities, getCityByPosition, getDaily, getFiveDays, getCurrent };