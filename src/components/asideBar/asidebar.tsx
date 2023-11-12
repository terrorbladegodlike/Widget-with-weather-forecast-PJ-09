import rain from '../../assets/img/weather/rain.png'
import { useAppCustomState } from '../../hooks/appHook';




export function AsideBar() {


  return (
    <div className='asidebar'>
      <AsideTitle />
      <div className='asidebar__row' >
        <AsideBoxCurrentTemp />
        <AsideBoxCurrentWatherInfo />
      </div>
    </div>
  );
}


export function AsideTitle() {
  const { AppSelectLocation, AppCurrentWeather } = useAppCustomState()



  return (
    <>
      {AppCurrentWeather.weather != undefined && AppSelectLocation != undefined
        ?
        <h2 className='asidebar__head'>{AppCurrentWeather.weather[0].main} in {AppSelectLocation.name}, {AppSelectLocation.state} {AppSelectLocation.country}  </h2>
        :
        <p className=''>waiting</p>
      }
    </>
  );
}


export function AsideBoxCurrentTemp() {

  const { AppCurrentWeather } = useAppCustomState()


  return (
    <div className='asidebar__box' >
      <h2 className='asidebar__title'>Температура</h2>
      <div className='asidebar__temp' >
        {AppCurrentWeather.weather != undefined
          ?
          <>
            <p className='asidebar__temp--pm'>{AppCurrentWeather.weather[0].description} </p>
            <p className='asidebar__temp--pm'>Текущая Температура - {Math.round(AppCurrentWeather.main.temp)}℃ </p>
            <p className='asidebar__temp--pm'> Feels like {Math.round(AppCurrentWeather.main.feels_like)}℃ </p>
          </>
          :
          <p className=''>waiting</p>
        }


      </div>
    </div>
  );
}




export function AsideBoxCurrentWatherInfo() {

  const { AppSelectLocation, AppDailyForecast, AppCurrentWeather } = useAppCustomState()


  return (
    <div className='asidebar__box' >
      <h2 className='asidebar__title'>Дополнительная информация</h2>

      <div className='asidebar__temp' >



        {AppCurrentWeather.weather != undefined
          ?
          <>
            <p className='asidebar__temp--pm'> Атмосферное давление {Math.round(AppCurrentWeather.main.pressure)} hPa </p>
            <p className='asidebar__temp--pm'> Влажность {Math.round(AppCurrentWeather.main.humidity)} % </p>
            <p className='asidebar__temp--pm'> Скорость ветра {Math.round(AppCurrentWeather.wind.speed)} meter/sec </p>
          </>
          :
          <p className=''>waiting</p>
        }
      </div>
    </div>
  );
}

