

export interface AppState {
  status: string
  error: string
  SearchLocations: ILocation[]
}


export interface ILocation {
  name: string;
  state: string;
  country: string;
  local_names: {
    ru?: string;
  };
  lat: number;
  lon: number;
}



export const DEF_APP_STATE: AppState = {
  status: '',
  error: '',
  SearchLocations: [],
}

export const DEF_SELECT_LOCATION_STATE: ILocation =
{
  name: "",
  lat: 0,
  lon: 0,
  country: "",
  state: "",
  local_names: {},
}

export const DEF_DAILY_FORECAST_STATE: IDailyForecast =
{
  list: [],
}

export const DEF_CURRENT_DAY_WEATHER_STATE: ICurrentDayWeather = {} as ICurrentDayWeather
export const DEF_WEEK_WEATHER_STATE: IWeekForecast = {} as IWeekForecast


// export interface IChildren {
//   children: React.ReactNode;
// }


export interface IDailyWeather {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  clouds: {
    all: 100;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  dt_txt: string;
}


export interface IDayForecastInWeek {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  speed: number;
  deg: number;
  gust: number;
}


export interface ICurrentDayWeather {
  weather: Iw[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  dt: number;
}

interface Iw {
  id: number;
  main: string;
  description: string;
  icon: string;
}


/**
 * Почасовой прогноз
 */
export interface IDailyForecast {
  list: IDailyWeather[];
}

/**
 * Прогноз на 5 дней
 */
export interface IWeekForecast {
  list: IDayForecastInWeek[];
}

