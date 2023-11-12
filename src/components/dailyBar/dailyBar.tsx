import { useAppCustomState } from '../../hooks/appHook';
import { IDailyWeather } from '../../models/stateApp';


export function DailyBar() {
  const { AppDailyForecast } = useAppCustomState()

  return (
    <div className='weekbar'>
      <div className='weekbar__row' >

        {AppDailyForecast.list != undefined
          ?
          AppDailyForecast.list ? AppDailyForecast.list.map((link, i) => <DailyHour key={i} {...link} ></DailyHour>) : ""
          :
          <p className=''>waiting</p>
        }
      </div>
    </div>
  );
}


export function DailyHour(props: IDailyWeather) {
  const time = new Date(props.dt * 1000);
  const iconSrc = `https://openweathermap.org/img/wn/${props.weather[0].icon}@2x.png`;
  return (
    <div className='weekbar__day' >
      <h2 className='weekbar__time'> {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</h2>
      <h2 className='weekbar__title'> {props.weather[0].main} </h2>
      <img className='weekbar__img' src={iconSrc} alt="" />
      <div className='weekbar__temp' >
        <span className='weekbar__temp--pm'>{Math.round(props.main.temp)}℃ </span>
      </div>
    </div>
  );
}




