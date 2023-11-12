import { useAppCustomState } from '../../hooks/appHook';
import { IDailyWeather, IDayForecastInWeek } from '../../models/stateApp';


export function WeekBar() {
  const { AppWeekWeather } = useAppCustomState()

  return (
    <div className='weekbar'>
      <div className='weekbar__row' >

        {  AppWeekWeather.list ? AppWeekWeather.list.map((link, i) => <WeekDay key={i} {...link} ></WeekDay>) : <p className=''>waiting</p>}
        
      </div>
    </div>
  );
}


export function WeekDay(props: IDayForecastInWeek) {

  const date = new Date(props.dt * 1000);
  const iconUrl = `https://openweathermap.org/img/wn/${props.weather[0].icon}@2x.png`;


  return (
    <div className='weekbar__day' >
      <h2 className='weekbar__time'> {date.getDate()} {date.toLocaleDateString('ru-Ru', { weekday: "long"})}</h2>
      <img className='weekbar__img' src={iconUrl} alt="" />
      <div className='weekbar__temp' >
        <span className='weekbar__temp--pm'>{Math.round(props.temp.eve)}℃ </span>
        <span className='weekbar__temp--pm'>{props.weather[0].description}</span>

      </div>
    </div>
  );
}




