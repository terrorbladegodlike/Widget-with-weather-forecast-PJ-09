import React, { createContext, useState, useContext } from "react";

import { AppState as AS, DEF_APP_STATE, DEF_CURRENT_DAY_WEATHER_STATE, DEF_DAILY_FORECAST_STATE, DEF_SELECT_LOCATION_STATE, DEF_WEEK_WEATHER_STATE, ICurrentDayWeather, IDailyForecast, IDailyWeather, ILocation, IWeekForecast } from '../models/stateApp';
import axios, { AxiosError } from "axios";


export interface AppContext {
  AppCustomState: AS;
  AppSelectLocation: ILocation;
  AppDailyForecast: IDailyForecast;
  AppCurrentWeather: ICurrentDayWeather;
  AppSwitch: string;
  AppWeekWeather: IWeekForecast;
  HandleSetSwitch: (el: string) => void;
  HandleAddFindLocations: (locations: ILocation[]) => void
  HandleClearFindLocations: () => void
  HandleSetSelectLocation: (location: ILocation) => void
  HandleSetDailyForecast: (dailyWeather: IDailyForecast) => void
  HandleSetCurrentWeather: (currentDayWeather: ICurrentDayWeather) => void

  HandleSetWeekWeather: (weekWeather: IWeekForecast) => void

}

const AppStateContext = createContext<AppContext>(
  {
    AppCustomState: DEF_APP_STATE,
    AppSelectLocation: DEF_SELECT_LOCATION_STATE,
    AppDailyForecast: DEF_DAILY_FORECAST_STATE,
    AppCurrentWeather: DEF_CURRENT_DAY_WEATHER_STATE,
    AppWeekWeather: DEF_WEEK_WEATHER_STATE,
    AppSwitch: '',
    HandleSetSwitch(f) { },
    HandleAddFindLocations(f) { },
    HandleClearFindLocations() { },
    HandleSetSelectLocation(f) { },
    HandleSetDailyForecast(f) { },
    HandleSetCurrentWeather(f) { },
    HandleSetWeekWeather(f) { },


  });

export const useAppCustomState = () => { return useContext(AppStateContext) };
type Props = {
  children: JSX.Element
}

export const AppStateContextProvider = ({ children }: Props) => {

  const [AppCustomState, setAppCustomState] = useState(DEF_APP_STATE)
  const [AppSwitch, AppSetSwitch] = useState("today")
  const [AppSelectLocation, setAppSelectLocation] = useState<ILocation>(DEF_SELECT_LOCATION_STATE)
  const [AppDailyForecast, setAppDailyForecast] = useState<IDailyForecast>(DEF_DAILY_FORECAST_STATE)
  const [AppCurrentWeather, setAppCurrentWeather] = useState<ICurrentDayWeather>(DEF_CURRENT_DAY_WEATHER_STATE)
  const [AppWeekWeather, setAppWeekWeather] = useState<IWeekForecast>(DEF_WEEK_WEATHER_STATE)


  //* HandleAddFindLocations обновление стейта приложения (доб новые локации после поиска)
  const HandleAddFindLocations = (locations: ILocation[]): void => {
    const NEW_APP_STATE = {} as AS
    NEW_APP_STATE.SearchLocations = locations

    setAppCustomState(NEW_APP_STATE);
  };

  //* HandleClearFindLocations обновление стейта приложения (удалить все локации если в строке поиска нет символов)
  const HandleClearFindLocations = (): void => {
    const NEW_APP_STATE = {} as AS
    NEW_APP_STATE.SearchLocations = []
    setAppCustomState(NEW_APP_STATE);
  };

  const HandleSetSelectLocation = (location: ILocation): void => {

    setAppSelectLocation(location);
  };

  //* HandleSetDailyForecast обновление стейта приложения (добавить данные о прогнозе погоды)
  const HandleSetDailyForecast = (dailyForecast: IDailyForecast): void => {
    setAppDailyForecast(dailyForecast);
  };


  //* HandleSetCurrentWeather обновление стейта приложения (добавить данные о прогнозе погоды)
  const HandleSetCurrentWeather = (currentDayWeather: ICurrentDayWeather): void => {
    setAppCurrentWeather(currentDayWeather);
  };

  //* HandleSetSwitch обновление стейта приложения ()
  const HandleSetSwitch = (el: string): void => {
    AppSetSwitch(el);
  };
  //* HandleSetCurrentWeather обновление стейта приложения (добавить данные о прогнозе погоды)
  const HandleSetWeekWeather = (weekWeather: IWeekForecast): void => {
    console.log('weekWeather',weekWeather);
    setAppWeekWeather(weekWeather);
  };

  return (
    <AppStateContext.Provider value={{ AppCustomState, AppSelectLocation, AppDailyForecast, AppCurrentWeather, AppSwitch,AppWeekWeather, HandleSetSwitch,HandleSetWeekWeather, HandleAddFindLocations, HandleSetDailyForecast, HandleSetSelectLocation, HandleClearFindLocations, HandleSetCurrentWeather }} >
      {children}
    </AppStateContext.Provider>
  )
}