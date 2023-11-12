import { Card } from '../card/card';

import lat from '../../assets/img/widget/widgetBar/lat.png'
import lon from '../../assets/img/widget/widgetBar/lon.png'
import { SearchLocation } from '../search/search';
import { useAppCustomState } from '../../hooks/appHook';
import { useEffect, useState } from 'react';



export const WidgetBar = () => {
  const { AppSelectLocation,AppDailyForecast } = useAppCustomState()

  const [time, setTime] = useState(new Date());

  useEffect(
    () => {
      const intervalId = setInterval(() => {
        setTime(new Date());
      }, 1000);
      return () => {
        clearInterval(intervalId)
      }
    }
  )
  const d = new Date();

  return (
    <aside className="widget__bar bar">
      <div className="bar__column">
        <SearchLocation />
        {AppDailyForecast.list.length > 0
          ?
          <>
            <h2 className="bar__temp"> {Math.round(AppDailyForecast.list[0].main.temp)}℃  </h2>
            <h2 className="bar__date  ">{d.toLocaleDateString('ru-Ru', { weekday: "long"})},<span className="bar__date--time">  {time.toLocaleDateString('en-GB', {
              hour:'numeric',
              minute: 'numeric',
              second: 'numeric',
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}</span> </h2>
            <div className="bar__desc">
              <div className="bar__desc--row">
                <div className="bar__desc--img" style={{ backgroundImage: `url(${lat})` }}></div>
                <h2 className="bar__desc--text">{AppSelectLocation.lat ? AppSelectLocation.lat : 0}</h2>
              </div>
              <div className="bar__desc--row">
                <div className="bar__desc--img" style={{ backgroundImage: `url(${lon})` }}></div>
                <h2 className="bar__desc--text">{AppSelectLocation.lon ? AppSelectLocation.lon : 0}</h2>
              </div>
            </div>
          </>
          :
          <h2 className="bar__temp"> </h2>}
        <Card></Card>
      </div>
    </aside>
  )
}



